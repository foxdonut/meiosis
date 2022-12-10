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
export type RouteConfig<T extends string = string> = Record<string, T>;

/**
 * Route and query string params.
 */
export type Params = Record<string, any>;

/**
 * A route in the application state.
 */
export type Route<T extends string = string> = {
  /** The value corresponding to the route. */
  value: T;

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
export type ToUrl<T extends string = string> = (value: T, params?: Params) => string;

/**
 * Function to generate a Route.
 *
 * @param value the route value.
 * @param params the path parameters.
 */
export type ToRoute<T extends string = string> = (value: T, params?: Params) => Route<T>;

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
export type OnRouteChange<T extends string = string> = (route: Route<T>) => void;

/**
 * Function to start the router.
 *
 * @param onRouteChange callback function for when the route changes.
 */
export type Start<T extends string = string> = (onRouteChange: OnRouteChange<T>) => void;

export type WindowLike = {
  decodeURI: (uri: string) => string;
  history: {
    pushState: (state: any, unused: string, url?: string) => any;
  };
  location: {
    hash: string;
    origin: string;
    pathname: string;
    search: string;
  };
  addEventListener: (event: string, handler: (event: any) => any, flag?: boolean) => any;
  removeEventListener: (event: string, handler: (event: any) => any) => any;
  onpopstate: ((this: any, event: PopStateEvent) => any) | null;
}

export type DoSyncLocationBarParams = {
  replace?: boolean;
  url: string;
  getUrl: () => string;
  wdw?: WindowLike;
};

/**
 * Function that synchronizes the location bar with the state route.
 */
export type SyncLocationBar<T extends string = string> = (route: Route<T>) => void;

/**
 * Configuration to create a router.
 */
export type RouterConfig<T extends string = string> = {
  /** The route configuration. */
  routeConfig: RouteConfig<T>;

  /** If specified, uses history mode instead of hash mode. If you are using history mode, you need
   * to provide server side router support. If not provided, defaults to the identity function. */
  rootPath?: string;

  /** The `window`, used for testing purposes. */
  wdw?: WindowLike;
};

/**
 * This is the router that is created by {@link "index".createRouter}.
 */
 export type Router<T extends string = string> = {
  /** The initial route as parsed from the location bar. */
  initialRoute: Route<T>;

  /** Function to generate a URL. */
  toUrl: ToUrl<T>;

  /** Function to generate a Route. */
  toRoute: ToRoute<T>;

  /** Function to start the router. */
  start: Start<T>;

  /** Function that synchronizes the location bar with the* state route. */
  syncLocationBar: SyncLocationBar<T>;
};
