/**
 * Route configuration. This is a plain object that associates route path templates to values.
 * Route path templates may contain parameters by using `:` as a prefix. For example:
 *
 * ```ts
 * const routeConfig: RouteConfig = {
 *   "/": "Home",
 *   "/login": "Login",
 *   "/user/:id": "UserProfile"
 * };
 * ```
 */
export type RouteConfig = Record<string, string>;

/**
 * Route and query string params.
 */
export type Params = Record<string, any> | null;

/**
 * A route in the application state.
 */
export type Route = {
  /** The value corresponding to the route. */
  value: string;

  /** An object with route and query string params. */
  params: Params;

  /** Indicates whether to replace the entry in the browser's history. */
  replace?: boolean;
};

/**
 * Function to generate a URL from a value and params.
 *
 * @param value the route value.
 * @param params the path parameters.
 *
 * @returns the URL.
 */
export type ToUrl = (value: string, params?: Params) => string;

export type GetStatePath = (path: string) => string;

export type SetHref = (href: string) => void;

/**
 * Callback function for when the route changes. Typically, this function updates the application
 * state with the route, for example:
 *
 * ```js
 * router.start(route => update({ route: () => route }));
 * ```
 *
 * @param route type current route.
 */
export type OnRouteChange = (route: Route) => void;

/**
 * Function to start the router.
 *
 * @param onRouteChange callback function for when the route changes.
 */
export type Start = (onRouteChange: OnRouteChange) => void;

export type DoSyncLocationBarParams = {
  replace?: boolean;
  url: string;
  getUrl: () => string;
  wdw?: Window;
};

/**
 * Function that synchronizes the location bar with the state route.
 */
export type SyncLocationBar = (route: Route) => void;

/**
 * Configuration to create a router.
 */
export type RouterConfig = {
  /** The route configuration. */
  routeConfig: RouteConfig;

  /** If specified, uses history mode instead of hash mode. If you are using history mode, you need
   * to provide server side router support. If not provided, defaults to the identity function. */
  rootPath?: string;

  /** The `window`, used for testing purposes. */
  wdw?: Window;
};

/**
 * This is the router that is created by {@link createRouter}.
 */
 export type Router = {
  /** The initial route as parsed from the location bar. */
  initialRoute: Route;

  /** Function to generate a URL. */
  toUrl: ToUrl;

  /** Function to start the router. */
  start: Start;

  /** Function that synchronizes the location bar with the* state route. */
  syncLocationBar: SyncLocationBar;
};
