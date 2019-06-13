/**
 * `meiosis-routing/router-helper`
 * @module router-helper
 */
import { Route } from "../state";
export declare type NestedRouteConfig = [string, RouteConfig] | [string, string[], RouteConfig];
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
export declare type parsePath = (path: string, queryParams: Object) => Route;
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
export declare type createParsePath = (routeMap: RouteMap, defaultRoute?: Route) => parsePath;
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
    queryString?: any;
    getPath?: () => string;
    setPath: (path: string) => void;
    addLocationChangeListener?: any;
    createRouteMatcher?: any;
    Mapper?: any;
    m?: any;
}
export declare function findPathParams(path: string): string[];
export declare function findQueryParams(path: string): string[];
export declare function setParams(path: string, params: Object): string;
export declare function convertToPath(routeConfig: any, routes: any, qsStringify: any): string;
export declare function createRouteMap(routeConfig?: {}, path?: string, fn?: (params: Object) => Route, acc?: {}): RouteMap;
export interface Router {
    initialRoute?: Route;
    locationBarSync: (route: Route) => void;
    parsePath: (path: string) => Route;
    routeMap: RouteMap;
    start: (x: any) => void;
    toPath: (route: Route) => string;
    MithrilRoutes?: any;
}
export declare type RouteMap = {
    [path: string]: (params: Object) => Route;
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
export declare function createRouter({ createParsePath, routeConfig, defaultRoute, prefix, queryString, getPath, setPath, addLocationChangeListener }: RouterConfig): Router;
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
export declare function createFeatherRouter({ createRouteMatcher, routeConfig, defaultRoute, prefix, queryString, getPath, setPath, addLocationChangeListener }: {
    createRouteMatcher: any;
    routeConfig: any;
    defaultRoute: any;
    prefix?: string | undefined;
    queryString: any;
    getPath: any;
    setPath: any;
    addLocationChangeListener: any;
}): Router;
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
export declare function createUrlMapperRouter({ Mapper, routeConfig, defaultRoute, prefix, queryString, getPath, setPath, addLocationChangeListener }: {
    Mapper: any;
    routeConfig: any;
    defaultRoute: any;
    prefix?: string | undefined;
    queryString: any;
    getPath: any;
    setPath: any;
    addLocationChangeListener: any;
}): Router;
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
export declare function createMithrilRouter({ m, routeConfig, prefix, getPath, setPath }: {
    m: any;
    routeConfig: any;
    prefix?: string | undefined;
    getPath: any;
    setPath: any;
}): Router;
