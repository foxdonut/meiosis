/**
 * `meiosis-router-setup`
 *
 * The `router-setup` module contains functions for creating a router by plugging in a router
 * library.
 *
 * @module routerSetup
 */

/**
 * Route params.
 */
export type Params = Record<string, any>;

/**
 * A route.
 */
export interface Route {
  id: string;
  params: Params;
}

/**
 * A function that creates a [[Route]] with optional params.
 */
export type RouteParamFn = (params?: Record<string, any>) => Route;

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
export type createParsePath = (routeMap: RouteMap, defaultRoute: Route) => parsePath;

/** Represents a function that takes params and produces a [[Route]]. */
export type RouteFn = (params?: Record<string, any>) => Route;

/** Object that maps paths to route functions. */
export interface RouteMap {
  [path: string]: RouteFn;
}

/**
 * Represents a router, which provides properties and functions to manage routes.
 */
export interface Router {
  initialRoute: Route;
  locationBarSync: (route: Route) => void;
  parsePath: (path: string) => Route;
  routeMap: RouteMap;
  start: (callback: { navigateTo: (path: string) => void }) => void;
  toPath: (route: Route) => string;
  MithrilRoutes?: any;
}

/**
 * Route configuration. This is an Object for which the properties are the ids of the routes,
 * and the values are either:
 *
 * - a string: the route path. May contain `:` for path parameters. May also contain `?` and/or `&`
 *   for query string parameters.
 * - an array: `[path, nestedConfig]`.
 *
 * @example
 *
 * ```
 *
 * const routeConfig = {
 *   Home: "/",
 *   User: ["/user/:name?param1", {
 *     UserProfile: "/profile?param2&param3",
 *     UserPreferences: "/preferences"
 *   }]
 * };
 * ```
 */
export interface RouteConfig {
  [id: string]: string;
}

/**
 * Router configuration.
 */
interface BaseRouterConfig {
  /** The route config. */
  routeConfig: RouteConfig;

  /** The default route. */
  defaultRoute: Route;

  /** The URL path prefix. Defaults to `"#"`. */
  prefix?: string;

  /** The query string utility that provides `parse` and `stringify`. */
  queryString?: any;

  /**
   * The function to get the path from the browser's location bar.
   * Defaults to `(() => window.location.hash || prefix + "/")`.
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
}

export interface RouterConfig extends BaseRouterConfig {
  /** Function that parses a path using a router library. */
  createParsePath: createParsePath;
}

export interface SuperouterConfig extends BaseRouterConfig {
  /** The [superouter](https://gitlab.com/harth/superouter) instance. */
  superouter: any;
}

export interface FeatherRouterConfig extends BaseRouterConfig {
  /**
   * The [Feather Route Matcher](https://github.com/henrikjoreteg/feather-route-matcher)
   * function.
   */
  createRouteMatcher: any;
}

export interface UrlMapperConfig extends BaseRouterConfig {
  /** The [URL Mapper](https://github.com/cerebral/url-mapper) function. */
  Mapper: any;
}

export interface MithrilRouterConfig extends BaseRouterConfig {
  /** The [Mithril](https://mithril.js.org) instance. */
  m: any;
}

////////

/**
 * Creates a `Route` helper with functions to create routes.
 *
 * @param routeNames the list of route names.
 * @returns a `Route` object with constructor functions.
 *
 * @example
 *
 * ```
 *
 * const Route = createRoute(["Home", "User"]);
 *
 * Route.Home()
 * // { id: "Home", params: {} }
 *
 * Route.User({ name: "duck" })
 * // { id: "User", params: { name: "duck" } }
 * ```
 */
export function createRoutes(routeNames: string[]): Record<string, RouteParamFn> {
  return routeNames.reduce((result, id): Record<string, RouteParamFn> => {
    result[id] = (params: Record<string, any>): Route => ({
      id,
      params: params == null ? {} : params
    });
    return result;
  }, {});
}

export const sanitizePath = (path: string): string => {
  /*
  Convert e.g.
  "/search/:id?page&sort/details/:type?filter"
  to
  "/search/:id/details/:type?page&sort?filter"
  */
  const pathParts = (path.match(/\/[^?]*/g) || []).join("");
  const queryParts = (path.match(/\?[^/]*/g) || []).join("");

  return pathParts + queryParts;
};

export const sanitizeRouteConfig = (routeConfig: RouteConfig): RouteConfig =>
  Object.entries(routeConfig).reduce(
    (result, [id, path]) => Object.assign(result, { [id]: sanitizePath(path) }),
    {}
  );

export const getPathWithoutQuery = (path: string): string => path.replace(/\?.*/, "");

export const getQuery = (path: string): string => {
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

export const pick = (obj, props): object =>
  props.reduce((result, prop): object => {
    if (obj[prop] != null) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});

export function convertToPath(routeConfig: RouteConfig, route: Route, qsStringify?): string {
  const configPath = routeConfig[route.id];
  let path = setParams(configPath, route.params);

  const queryParams = findQueryParams(configPath);
  const query = pick(route.params, queryParams);

  if (Object.keys(query).length > 0 && typeof qsStringify === "function") {
    path += "?" + qsStringify(query);
  }

  return path;
}

// Returns { "/path": fn(params) => route }
export function createRouteMap(routeConfig: RouteConfig): RouteMap {
  return Object.entries(routeConfig).reduce((result, [id, configPath]): RouteMap => {
    const routeParams = findPathParams(configPath).concat(findQueryParams(configPath));
    const localPath = getPathWithoutQuery(configPath);

    const routeFn: RouteFn = (params?: Record<string, any>): Route => ({
      id,
      params: pick(params, routeParams)
    });

    result[localPath] = routeFn;

    return result;
  }, {});
}

/**
 * Generic function to create a router from a router library of your choice.
 *
 * To use this function, write a `createXYZRouter` function that in turn calls `createRouter`.
 * All config parameters except for `createParsePath` are normally passed-thru from
 * `createXYZRouter` to `createRouter`, unless you want to define specific implementations of
 * `getPath`, `setPath`, and/or `addLocationChangeListener`.
 *
 * The key part is `createParsePath`. This is where you define how to plug in to the router
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
  const sanitizedRouteConfig = sanitizeRouteConfig(routeConfig);

  const prefix = config.prefix != null ? config.prefix : "#";

  const getPath =
    config.getPath === undefined
      ? (): string => window.location.hash || prefix + "/"
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

  const routeMap = createRouteMap(sanitizedRouteConfig);
  const parsePathFn = createParsePath ? createParsePath(routeMap, defaultRoute) : null;

  const parsePath = parsePathFn
    ? (pathWithPrefix: string): Route => {
        const path = decodeURI(pathWithPrefix.substring(prefix.length));
        const query = getQuery(path);
        const queryParams =
          query.length === 0 || !queryString.parse ? {} : queryString.parse(query);

        return parsePathFn(getPathWithoutQuery(path), queryParams);
      }
    : (): Route => defaultRoute;

  const toPath = (route: Route): string =>
    prefix + convertToPath(sanitizedRouteConfig, route, queryString.stringify);

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

  const initialRoute = parsePath(getPath());

  return { initialRoute, locationBarSync, parsePath, routeMap, start, toPath };
}

/**
 * Creates a router using [Superouter](https://gitlab.com/harth/superouter).
 *
 * @param config
 *
 * @example
 *
 * ```
 *
 * import { type as superouter } from "superouter";
 * import queryString from "query-string"; // only if using query strings
 *
 * const Route = createRoutes([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createSuperouter({
 *   superouter,
 *   routeConfig,
 *   defaultRoute: Route.Home(),
 *   queryString // only if using query strings
 * });
 * ```
 */
export function createSuperouter(config: SuperouterConfig): Router {
  const createParsePath = (_routeMap, defaultRoute): parsePath => {
    const superouteConfig = Object.entries(sanitizeRouteConfig(config.routeConfig)).reduce(
      (result, [id, path]) => Object.assign(result, { [id]: getPathWithoutQuery(path) }),
      {}
    );

    const Superouter = config.superouter("Route", superouteConfig);

    const parsePath = (path, queryParams): Route => {
      const match = Superouter.matchOr(
        () => ({ case: defaultRoute.id, value: defaultRoute.params }),
        path
      );

      return { id: match.case, params: Object.assign({}, match.value, queryParams) };
    };
    return parsePath;
  };

  return createRouter(Object.assign({ createParsePath }, config));
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
 * const Route = createRoutes([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createFeatherRouter({
 *   createRouteMatcher,
 *   routeConfig,
 *   defaultRoute: Route.Home(),
 *   queryString // only if using query strings
 * });
 * ```
 */
export function createFeatherRouter(config: FeatherRouterConfig): Router {
  const createParsePath = (routeMap, defaultRoute): parsePath => {
    const routeMatcher = config.createRouteMatcher(routeMap);

    const parsePath = (path, queryParams): Route => {
      const match = routeMatcher(path);

      return match ? match.page(Object.assign({}, match.params, queryParams)) : defaultRoute;
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
 * const Route = createRoutes([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createUrlMapperRouter({
 *   Mapper,
 *   routeConfig,
 *   defaultRoute: Route.Home(),
 *   queryString: urlon // only if using query strings
 * });
 * ```
 */
export function createUrlMapperRouter(config: UrlMapperConfig): Router {
  const createParsePath = (routeMap, defaultRoute): parsePath => {
    const urlMapper = config.Mapper();

    const parsePath = (path, queryParams): Route => {
      const matchedRoute = urlMapper.map(path, routeMap);

      return matchedRoute
        ? matchedRoute.match(Object.assign({}, matchedRoute.values, queryParams))
        : defaultRoute;
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
 * const Route = createRoutes([...]);
 *
 * const routeConfig = { ... };
 *
 * const router = createMithrilRouter({
 *   m,
 *   routeConfig
 * });
 * ```
 */
export function createMithrilRouter(config: MithrilRouterConfig): Router {
  const queryString = { stringify: config.m.buildQueryString };
  const createParsePath = (_routeMap, _defaultRoute): parsePath => (_path, _queryParams): Route =>
    config.defaultRoute;

  const router = createRouter(
    Object.assign({ prefix: "#!", queryString, createParsePath }, config)
  );

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
