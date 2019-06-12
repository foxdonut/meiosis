/**
 * `meiosis-routing/router-helper`
 * @module router-helper
 */

import { Route } from "../state";

export type NestedRouteConfig =
  [string, RouteConfig] |
  [string, string[], RouteConfig];

/**
 * Route configuration. This is an Object for which the properties are the ids of the route
 * segments, and the values are either:
 *
 * - a string: the route path. May contain `:` for path parameters. May also contain `?` and/or `&`
 *   for query string parameters.
 * - an array: `[ path, (optional) array of parameters from the parent, nested route config ]`
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
  [id: string]: string | NestedRouteConfig;
}

/**
 * `function parsePath(path, queryParams): route`
 *
 * Function that parses a path and returns a route.
 *
 * @typedef {function} parsePath
 *
 * @param {string} path - the path to parse.
 * @param {Object} queryParams - an object with the query string parameters, if any are present.
 * @returns {route} the route obtained from the path and parameters.
 */
export type parsePath = (path: string, queryParams: Object) => Route;

/**
 * `function createParsePath(routeMap, defaultRoute): parsePath`
 *
 * Function that creates a function to parse a path.
 *
 * @typedef {function} createParsePath
 *
 * @param {Object} routeMap - an object with key-value pairs.
 * @param {Route} defaultRoute - the default route.
 * @returns {parsePath} the function that parses a path.
 */
export type createParsePath = (routeMap: RouteMap, defaultRoute?: Route) => parsePath;

/**
 * Router configuration.
 *
 * @property {RouteConfig} routeConfig - the route config
 * @property {string} [prefix="#"] - the URL path prefix. Defaults to `"#"`.
 * @property {Route} [defaultRoute] - the default route
 * @property {createParsePath} createParsePath - function that parses a path using a router library.
 * @property {function} [getPath] - the function to get the path from the browser's location bar.
 * Defaults to `(() => document.location.hash || prefix + "/")`.
 * @property {function} [setPath] - the function to set the path on the browser's location bar.
 * Defaults to `(path => window.history.pushState({}, "", path))`.
 * @property {function} [addLocationChangeListener] - the function to add the location change
 * listener. Defaults to `window.onpopstate = listener`.
 * @property {function} createRouteMatcher - the Feather Route Matcher function.
 * @property {Function} Mapper - the URL Mapper function.
 * @property {Mithril} m - the Mithril instance.
 */
export interface RouterConfig {
  routeConfig: RouteConfig;
  prefix?: string;
  defaultRoute?: Route;
  createParsePath?: createParsePath;
  queryString?: any; // FIXME
  getPath?: () => string;
  setPath: (path: string) => void;
  addLocationChangeListener?: any;
  createRouteMatcher?: any;
  Mapper?: any;
  m?: any;
}

const getPathWithoutQuery = (path: string): string => path.replace(/\?.*/, "");

const getQuery = (path: string): string => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

const extractMatches = matches => {
  if (matches) {
    return matches.map(param => param.substring(1));
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

export function setParams(path: string, params: Object): string {
  return findPathParams(path).reduce((result, pathParam) => {
    const value = params[pathParam] || "";
    const key = ":" + pathParam;
    const idx = result.indexOf(key);
    return result.substring(0, idx) + value + result.substring(idx + key.length);
  }, getPathWithoutQuery(path));
}

const getConfig = config =>
  config == null
    ? ["/", [], {}]
    : typeof config === "string"
    ? [config, [], {}]
    : config.length === 2
    ? Array.isArray(config[1])
      ? [config[0], config[1], {}]
      : [config[0], [], config[1]]
    : config;

const pick = (obj, props) =>
  props.reduce((result, prop) => {
    if (obj[prop] != null) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});

export function convertToPath(routeConfig, routes, qsStringify) {
  let path = "";
  let lookup = routeConfig;
  let query = {};

  routes.forEach(route => {
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
export function createRouteMap(routeConfig = {}, path = "", fn: (params: Object) => Route = (_) => [], acc = {}): RouteMap {
  return Object.entries(routeConfig).reduce((result, [id, config]) => {
    const [configPath, parentParams, children] = getConfig(config);

    const routeParams = findPathParams(configPath)
      .concat(findQueryParams(configPath))
      .concat(parentParams);

    const localPath = path + getPathWithoutQuery(configPath);
    const routeFn = params => fn(params).concat({ id, params: pick(params, routeParams) });
    result[localPath] = routeFn;
    createRouteMap(children, localPath, routeFn, result);
    return result;
  }, acc);
}

export interface Router {
  initialRoute?: Route;
  locationBarSync: (route: Route) => void;
  parsePath: (path: string) => Route;
  routeMap: RouteMap;
  start: (x: any) => void;
  toPath: (route: Route) => string;
  MithrilRoutes?: any; // FIXME
}

export type RouteMap = {
  [path: string]: (params: Object) => Route
};

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
 * @param {RouterConfig} config
 * @returns {Object} router
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
export function createRouter({
  createParsePath,
  routeConfig,
  defaultRoute,
  prefix = "#",
  queryString,
  getPath,
  setPath,
  addLocationChangeListener
}: RouterConfig): Router {
  const fGetPath = (getPath === undefined) ? (() => document.location.hash || prefix + "/") : getPath;
  setPath = setPath || (path => window.history.pushState({}, "", path));

  queryString = queryString || {};

  addLocationChangeListener =
    addLocationChangeListener ||
    (listener => {
      window.onpopstate = listener;
    });

  const routeMap = createRouteMap(routeConfig);
  const parsePathFn = createParsePath ? createParsePath(routeMap, defaultRoute) : null;

  const parsePath = parsePathFn
    ? pathWithPrefix => {
        const path = pathWithPrefix.substring(prefix.length);
        const query = getQuery(path);
        const queryParams =
          query.length === 0 || !queryString.parse ? {} : queryString.parse(query);

        return parsePathFn(getPathWithoutQuery(path), queryParams);
      }
    : () => [];

  const toPath = route => prefix + convertToPath(routeConfig, route, queryString.stringify);

  // Function to keep the location bar in sync
  const locationBarSync = route => {
    const path = toPath(route);
    if (fGetPath() !== path) {
      setPath(path);
    }
  };

  // Listen to location changes and call navigateTo()
  const start = ({ navigateTo }) => {
    const parsePathAndNavigate = () => navigateTo(parsePath(fGetPath()));
    addLocationChangeListener(parsePathAndNavigate);
  };

  const initialRoute = parsePath ? parsePath(fGetPath()) : undefined;

  return { initialRoute, locationBarSync, parsePath, routeMap, start, toPath };
}

/**
 * Creates a router using
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher).
 *
 * @param {FeatherConfig} config
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
export function createFeatherRouter({
  createRouteMatcher,
  routeConfig,
  defaultRoute,
  prefix = "#",
  queryString,
  getPath,
  setPath,
  addLocationChangeListener
}) {
  const createParsePath = (routeMap, defaultRoute) => {
    const routeMatcher = createRouteMatcher(routeMap);

    const parsePath = (path, queryParams) => {
      const match = routeMatcher(path);

      if (match) {
        return match.page(Object.assign({}, match.params, queryParams));
      } else {
        return defaultRoute;
      }
    };
    return parsePath;
  };

  return createRouter({
    createParsePath,
    queryString,
    routeConfig,
    defaultRoute,
    prefix,
    getPath,
    setPath,
    addLocationChangeListener
  });
}

/**
 * Creates a router using
 * [url-mapper](https://github.com/cerebral/url-mapper).
 *
 * @param {UrlMapperConfig} config
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
export function createUrlMapperRouter({
  Mapper,
  routeConfig,
  defaultRoute,
  prefix = "#",
  queryString,
  getPath,
  setPath,
  addLocationChangeListener
}) {
  const createParsePath = (routeMap, defaultRoute) => {
    const urlMapper = Mapper();

    const parsePath = (path, queryParams) => {
      const matchedRoute = urlMapper.map(path, routeMap);

      if (matchedRoute) {
        return matchedRoute.match(Object.assign({}, matchedRoute.values, queryParams));
      } else {
        return defaultRoute;
      }
    };
    return parsePath;
  };

  return createRouter({
    createParsePath,
    queryString,
    routeConfig,
    defaultRoute,
    prefix,
    getPath,
    setPath,
    addLocationChangeListener
  });
}

/**
 * Creates a router using [Mithril Router](https://mithril.js.org/route.html).
 *
 * @param {MithrilConfig} config
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
export function createMithrilRouter({ m, routeConfig, prefix = "#!", getPath, setPath }) {
  const queryString = { stringify: m.buildQueryString };
  const router = createRouter({ queryString, routeConfig, prefix, getPath, setPath });

  router.MithrilRoutes = ({ states, actions, App }) =>
    Object.entries(router.routeMap).reduce((result, [path, fn]) => {
      result[path] = {
        onmatch: params => actions.navigateTo(fn(params)),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  return router;
}
