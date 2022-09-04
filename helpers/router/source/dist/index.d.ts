import { QueryStringLib } from './types';
export declare const getQueryString: (queryString: QueryStringLib, queryParams?: {}) => string;
/**
 * @template M
 * Creates a router.
 *
 * @param {RouterConfig<M>} config
 *
 * @return {Router} the created router.
 */
export declare const createRouter: ({ routeMatcher, convertMatch, routeConfig, toUrl, rootPath, plainHash, queryString, wdw }: {
    routeMatcher: any;
    convertMatch: any;
    routeConfig: any;
    toUrl: any;
    rootPath: any;
    plainHash?: boolean | undefined;
    queryString?: {
        parse: (_: any) => {};
        stringify: (_: any) => string;
    } | undefined;
    wdw?: (Window & typeof globalThis) | undefined;
}) => {
    initialRoute: any;
    toRoute: (page: any, params?: {}) => {
        page: any;
        params: {};
        changed: boolean;
    };
    replaceRoute: (page: any, params?: {}) => {
        page: any;
        params: {};
        changed: boolean;
        replace: boolean;
    };
    toUrl: any;
    start: (onRouteChange: any) => void;
    syncLocationBar: ({ page, params, replace }: {
        page: any;
        params: any;
        replace: any;
    }) => void;
};
/**
 * Helper for route change effects.
 */
export declare const RouteChangeEffect: ({ update, Effects, isRouteChanged, routeChangedPatch }: {
    update: any;
    Effects: any;
    isRouteChanged?: ((state: any) => any) | undefined;
    routeChangedPatch?: {
        route: {
            changed: boolean;
        };
    } | undefined;
}) => (state: any) => void;
/**
 * Configuration to create a Mithril router.
 *
 * @typedef {Object} MithrilRouterConfig
 *
 * @property {m} m the Mithril instance.
 * @property {RouteConfig} routeConfig the route configuration.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side router support.
 * @property {boolean} [plainHash=false] whether to use a plain hash, `"#"`, instead of a hash-bang,
 * `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
 * if `historyMode` is `true`.
 * @property {Window} [wdw=window] the `window`, used for testing purposes.
 */
/**
 * Mithril `onmatch` function.
 *
 * @callback MithrilOnmatch
 *
 * @param {any} params
 * @param {string} url
 *
 * @return {void}
 */
/**
 * Mithril `render` function.
 *
 * @callback MithrilRender
 *
 * @param {any} [vnode] vnode
 * @param {any} [attrs] attrs
 *
 * @return {any} vnode
 */
/**
 * Mithril route.
 *
 * @typedef {Object} MithrilRoute
 *
 * @property {MithrilOnmatch} onmatch
 * @property {MithrilRender} render
 */
/**
 * Mithril routes.
 *
 * @typedef {Object<string,MithrilRoute>} MithrilRoutes
 */
/**
 * Parameters to `createMithrilRoutes`.
 *
 * @typedef {Object} CreateMithrilRoutesConfig
 *
 * @property {OnRouteChange} onRouteChange
 * @property {any} render
 */
/**
 * Creates Mithril routes suitable for passing as the third argument to `m.route`, for example:
 *
 * ```javascript
 * m.route(
 *   document.getElementById("app"),
 *   "/",
 *   router.createMithrilRoutes({
 *     onRouteChange: route => update({ route: () => route }),
 *     App, states, update, actions
 *   })
 * );
 * ```
 *
 * @callback CreateMithrilRoutes
 *
 * @param {CreateMithrilRoutesConfig} config
 *
 * @return {MithrilRoutes} Mithril routes.
 */
/**
 * This is the router that is created by {@link createMithrilRouter}.
 *
 * @typedef {Object} MithrilRouter
 *
 * @property {CreateMithrilRoutes} createMithrilRoutes creates Mithril routes suitable for passing
 * as the third argument to `m.route`.
 * @property {ToRoute} toRoute function to convert a page and params to a route.
 * @property {ToRoute} replaceRoute function to convert a page and params to a route that will
 * replace the current route in the browser history.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {SyncLocationBar} syncLocationBar function that synchronizes the location bar with the
 * state route.
 */
/**
 * Mithril route property.
 *
 * @typedef {Object} MithrilDotRoute
 *
 * @property {string} prefix
 */
/**
 * Mithril instance.
 *
 * @typedef {any} m
 *
 * @property {MithrilDotRoute} route
 * @property {QueryStringStringify} buildQueryString
 */
/**
 * Sets up a router using [Mithril Router](https://mithril.js.org/route.html).
 *
 * @param {MithrilRouterConfig} config
 *
 * @return {MithrilRouter}
 */
export declare const createMithrilRouter: ({ m, routeConfig, rootPath, plainHash, wdw }: {
    m: any;
    routeConfig: any;
    rootPath: any;
    plainHash?: boolean | undefined;
    wdw?: (Window & typeof globalThis) | undefined;
}) => {
    createMithrilRoutes: ({ onRouteChange, render }: {
        onRouteChange: any;
        render: any;
    }) => {};
    toRoute: (page: any, params?: {}) => {
        page: any;
        params: {};
        changed: boolean;
    };
    replaceRoute: (page: any, params?: {}) => {
        page: any;
        params: {};
        changed: boolean;
        replace: boolean;
    };
    toUrl: (page: any, params?: {}) => any;
    syncLocationBar: ({ page, params, replace }: {
        page: any;
        params: any;
        replace: any;
    }) => void;
};
