/**
 * `meiosis-routing/router-helper`
 *
 * The `router-helper` module contains functions for creating a router by plugging in a router
 * library.
 *
 * @module routerHelper
 */

/**
 * Route configuration. This is an Object for which the properties are the ids of the route
 * segments, and the values are either:
 *
 * - a string: the route path. May contain `:` for path parameters. May also contain `?` and/or `&`
 *   for query string parameters.
 * - an array: `[path, nestedConfig]` or `[path, inheritArray, nestedConfig]`.
 *
 * @example
 *
 * ```
 *
 * const routeConfig = {
 *   Home: "/",
 *   User: ["/user/:name?param1", {
 *     Profile: "/profile?param2&param3",
 *     Preferences: ["/preferences", ["name"]]
 *   }]
 * };
 * ```
 */
export interface RouteConfig {
  [id: string]: any;
}

import { Route, RouteSegment } from "../state";

/**
 * Function that parses a path and returns a route.
 *
 * @param path the path to parse.
 * @param queryParams an object with the query string parameters, if any are present.
 * @returns the route obtained from the path and parameters.
 */
export type parsePath = (path: string, queryParams: Record<string, any>) => Route;

/**
 * Function that creates a function to parse a path.
 *
 * @param routeMap an object with key-value pairs.
 * @param defaultRoute the default route.
 * @returns the function that parses a path.
 */
export type createParsePath = (routeMap: RouteMap, defaultRoute?: Route) => parsePath;

/**
 * Router configuration.
 */
export interface RouterConfig {
  /** The route config. */
  routeConfig: RouteConfig;

  /** The URL path prefix. Defaults to `"#"`. */
  prefix?: string;

  /** The default route. */
  defaultRoute?: Route;

  /** Function that parses a path using a router library. */
  createParsePath?: createParsePath;

  queryString?: any;

  /**
   * The function to get the path from the browser's location bar.
   * Defaults to `(() => document.location.hash || prefix + "/")`.
   */
  getPath?: () => string;

  /**
   * The function to set the path on the browser's location bar.
   * Defaults to `(path => window.history.pushState({}, "", path))`.
   */
  setPath?: (path: string) => void;

  /**
   * The function to add the location change listener. Defaults to `window.onpopstate = listener`.
   */
  addLocationChangeListener?: any;

  /**
   * The [Feather Route Matcher](https://github.com/henrikjoreteg/feather-route-matcher)
   * function.
   */
  createRouteMatcher?: any;

  /** The [URL Mapper](https://github.com/cerebral/url-mapper) function. */
  Mapper?: any;

  /** The [Mithril](https://mithril.js.org) instance. */
  m?: any;
}

/** Represents a function that takes params and produces a [[Route]]. */
export type RouteFn = (params?: Record<string, any>) => Route;

/** Object that maps paths to route functions. */
export interface RouteMap {
  [path: string]: RouteFn;
}

/**
 * Represents a router, which provides properties and functions to manage route paths.
 */
export interface Router {
  initialRoute?: Route;
  locationBarSync: (route: Route) => void;
  parsePath: (path: string) => Route;
  routeMap: RouteMap;
  start: (callback: { navigateTo: (path: string) => void }) => void;
  toPath: (route: Route | RouteSegment) => string;
  MithrilRoutes?: any;
}

////////

const getPathWithoutQuery = (path: string): string => path.replace(/\?.*/, "");

const getQuery = (path: string): string => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

const extractMatches = (matches): string[] => {
  if (matches) {
    return matches.map((param): string => param.substring(1));
  } else {
    return [];
  }
};

export function findPathParams(path: string): string[] {
  return extractMatches(path.match(/:[^/?]*/g));
}

export function findQueryParams(path: string): string[] {
  return extractMatches(path.match(/[?&][^?&]*/g));
}

export function setParams(path: string, params: Record<string, any>): string {
  return findPathParams(path).reduce((result, pathParam): string => {
    const value = encodeURI(params[pathParam] || "");
    const key = ":" + pathParam;
    const idx = result.indexOf(key);
    return result.substring(0, idx) + value + result.substring(idx + key.length);
  }, getPathWithoutQuery(path));
}

const getConfig = (config): any[] =>
  config == null
    ? ["/", [], {}]
    : typeof config === "string"
    ? [config, [], {}]
    : config.length === 2
    ? Array.isArray(config[1])
      ? [config[0], config[1], {}]
      : [config[0], [], config[1]]
    : config;

const pick = (obj, props): object =>
  props.reduce((result, prop): object => {
    if (obj[prop] != null) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});

export function convertToPath(routeConfig, routeOrRoutes, qsStringify?): string {
  let path = "";
  let lookup = routeConfig;
  let query = {};
  const routes: Route = Array.isArray(routeOrRoutes) ? routeOrRoutes : [routeOrRoutes];

  routes.forEach((route): void => {
    const [configPath, _parentParams, children] = getConfig(lookup[route.id]);
    path += setParams(configPath, route.params);
    lookup = children;

    const queryParams = findQueryParams(configPath);
    query = Object.assign(query, pick(route.params, queryParams));
  });

  if (Object.keys(query).length > 0 && typeof qsStringify === "function") {
    path += "?" + qsStringify(query);
  }

  return path;
}

// Returns { "/path": fn(params) => [route] }
export function createRouteMap(
  routeConfig = {},
  path = "",
  fn: (params?: Record<string, any>) => Route = (_none): Route => [],
  acc = {}
): RouteMap {
  return Object.entries(routeConfig).reduce((result, [id, config]): RouteMap => {
    const [configPath, parentParams, children] = getConfig(config);

    const routeParams = findPathParams(configPath)
      .concat(findQueryParams(configPath))
      .concat(parentParams);

    const localPath = path + getPathWithoutQuery(configPath);

    const routeFn: RouteFn = (params?: Record<string, any>): Route =>
      fn(params).concat({ id, params: pick(params, routeParams) });
    result[localPath] = routeFn;

    createRouteMap(children, localPath, routeFn, result);

    return result;
  }, acc);
}

/**
 * Generic function to create a router from a router library of your choice.
 *
 * To use this function, write a `createXYZRouter` function that in turn calls `createRouter`.
 * All config parameters except for `createParsePath` are normally passed-thru from
 * `createXYZRouter` to `createRouter`, unless you want to define specific implementations of
 * `getPath`, `setPath`, and/or `addLocationChangeListener`.
 *
 * The key parse is `createParsePath`. This is where you define how to plug in to the router
 * library of your choice.
 *
 * `function createParsePath(routeMap, defaultRoute)` receives a `routeMap` which is an object
 * with
 *
 * @param config
 * @returns the created router.
 *
 * @example
 *
 * ```
 *
 * // Example of a createParsePath function with feather-route-matcher
 * const createParsePath = (routeMap, defaultRoute) => {
 *   const routeMatcher = createRouteMatcher(routeMap);
 *
 *   const parsePath = (path, queryParams) => {
 *     const match = routeMatcher(path);
 *
 *     if (match) {
 *       return match.page(Object.assign({}, match.params, queryParams));
 *     } else {
 *       return defaultRoute;
 *     }
 *   };
 *   return parsePath;
 * };
 * ```
 */
export function createRouter(config: RouterConfig): Router {
  const { routeConfig, createParsePath, defaultRoute } = config;

  const prefix = config.prefix || "#";

  const getPath =
    config.getPath === undefined
      ? (): string => document.location.hash || prefix + "/"
      : config.getPath;

  const setPath =
    config.setPath === undefined
      ? (path: string): void => window.history.pushState({}, "", path)
      : config.setPath;

  const queryString = config.queryString || {};

  const addLocationChangeListener =
    config.addLocationChangeListener ||
    ((listener): void => {
      window.onpopstate = listener;
    });

  const routeMap = createRouteMap(routeConfig);
  const parsePathFn = createParsePath ? createParsePath(routeMap, defaultRoute) : null;

  const parsePath = parsePathFn
    ? (pathWithPrefix: string): Route => {
        const path = pathWithPrefix.substring(prefix.length);
        const query = getQuery(path);
        const queryParams =
          query.length === 0 || !queryString.parse ? {} : queryString.parse(query);

        return parsePathFn(getPathWithoutQuery(path), queryParams);
      }
    : (): Route => [];

  const toPath = (route: Route | RouteSegment): string =>
    prefix + convertToPath(routeConfig, route, queryString.stringify);

  // Function to keep the location bar in sync
  const locationBarSync = (route: Route): void => {
    const path = toPath(route);
    if (getPath() !== path) {
      setPath(path);
    }
  };

  // Listen to location changes and call navigateTo()
  const start = ({ navigateTo }): void => {
    const parsePathAndNavigate = (): void => navigateTo(parsePath(getPath()));
    addLocationChangeListener(parsePathAndNavigate);
  };

  const initialRoute = parsePath ? parsePath(getPath()) : undefined;

  return { initialRoute, locationBarSync, parsePath, routeMap, start, toPath };
}

/**
 * Creates a router using
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import createRouteMatcher from "feather-route-matcher";
 * import queryString from "query-string"; // only if using query strings
 *
 * const Route = createRouteSegments([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createFeatherRouter({
 *   createRouteMatcher,
 *   routeConfig,
 *   defaultRoute: [Route.Home()],
 *   queryString // only if using query strings
 * });
 * ```
 */
export function createFeatherRouter(config: RouterConfig): Router {
  const createParsePath = (routeMap, defaultRoute): parsePath => {
    const routeMatcher = config.createRouteMatcher(routeMap);

    const parsePath = (path, queryParams): Route => {
      const match = routeMatcher(path);

      if (match) {
        const params = Object.keys(match.params || {}).reduce((result: any, key: string): any => {
          result[key] = decodeURI(match.params[key]);
          return result;
        }, {});

        return match.page(Object.assign({}, params, queryParams));
      } else {
        return defaultRoute;
      }
    };
    return parsePath;
  };

  return createRouter(Object.assign({ createParsePath }, config));
}

/**
 * Creates a router using
 * [url-mapper](https://github.com/cerebral/url-mapper).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import Mapper from "url-mapper";
 * import urlon from "urlon"; // only if using query strings
 *
 * const Route = createRouteSegments([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createUrlMapperRouter({
 *   Mapper,
 *   routeConfig,
 *   defaultRoute: [Route.Home()],
 *   queryString: urlon // only if using query strings
 * });
 * ```
 */
export function createUrlMapperRouter(config: RouterConfig): Router {
  const createParsePath = (routeMap, defaultRoute): parsePath => {
    const urlMapper = config.Mapper();

    const parsePath = (path, queryParams): Route => {
      const matchedRoute = urlMapper.map(path, routeMap);

      if (matchedRoute) {
        return matchedRoute.match(Object.assign({}, matchedRoute.values, queryParams));
      } else {
        return defaultRoute;
      }
    };
    return parsePath;
  };

  return createRouter(Object.assign({ createParsePath }, config));
}

/**
 * Creates a router using [Mithril Router](https://mithril.js.org/route.html).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import m from "mithril";
 * // Note: query strings are built-in to Mithril
 *
 * const Route = createRouteSegments([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createMithrilRouter({
 *   m,
 *   routeConfig
 * });
 * ```
 */
export function createMithrilRouter(config: RouterConfig): Router {
  const queryString = { stringify: config.m.buildQueryString };
  const router = createRouter(Object.assign({ prefix: "#!", queryString }, config));

  router.MithrilRoutes = ({ states, actions, App }): Record<string, object> =>
    Object.entries(router.routeMap).reduce((result, [path, fn]): Record<string, object> => {
      result[path] = {
        onmatch: (params): void => actions.navigateTo(fn(params)),
        render: (): void => config.m(App, { state: states(), actions })
      };
      return result;
    }, {});

  return router;
}
