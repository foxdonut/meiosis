/**
 * `meiosis-routing/router-helper`
 *
 * The `router-helper` module contains functions for creating a router by plugging in a router
 * library.
 *
 * @module routerHelper
 */
/**
 * Nested route configuration.
 */
export declare type NestedRouteConfig = [string, RouteConfig] | [string, string[], RouteConfig];
import { Route } from "../state";
/**
 * Route configuration. This is an Object for which the properties are the ids of the route
 * segments, and the values are either:
 *
 * - a string: the route path. May contain `:` for path parameters. May also contain `?` and/or `&`
 *   for query string parameters.
 * - an array: [[NestedRouteConfig]]
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
 * Function that parses a path and returns a route.
 *
 * @param path the path to parse.
 * @param queryParams an object with the query string parameters, if any are present.
 * @returns the route obtained from the path and parameters.
 */
export declare type parsePath = (path: string, queryParams: Record<string, any>) => Route;
/**
 * Function that creates a function to parse a path.
 *
 * @param routeMap an object with key-value pairs.
 * @param defaultRoute the default route.
 * @returns the function that parses a path.
 */
export declare type createParsePath = (routeMap: RouteMap, defaultRoute?: Route) => parsePath;
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
    getPath: () => string;
    /**
     * The function to set the path on the browser's location bar.
     * Defaults to `(path => window.history.pushState({}, "", path))`.
     */
    setPath: (path: string) => void;
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
export declare type RouteFn = (params: Record<string, any>) => Route;
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
    start: (x: any) => void;
    toPath: (route: Route) => string;
    MithrilRoutes?: any;
}
export declare function findPathParams(path: string): string[];
export declare function findQueryParams(path: string): string[];
export declare function setParams(path: string, params: Record<string, any>): string;
export declare function convertToPath(routeConfig: any, routes: any, qsStringify: any): string;
export declare function createRouteMap(routeConfig?: {}, path?: string, fn?: (params: Record<string, any>) => Route, acc?: {}): RouteMap;
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
export declare function createRouter(config: RouterConfig): Router;
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
export declare function createFeatherRouter(config: RouterConfig): Router;
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
export declare function createUrlMapperRouter(config: RouterConfig): Router;
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
export declare function createMithrilRouter(config: RouterConfig): Router;
