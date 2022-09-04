/**
 * Route configuration. This is a plain object that associates route path templates to string page
 * IDs. Route path templates may contain parameters by using `:` as a prefix. For example:
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
export type Params = Record<string, any>;

/**
 * A route in the application state.
 */
export type Route = {
  /** The page corresponding to the route. */
  page: string;

  /** An object with route and query string params. */
  params: Params;

  /** Indicates whether to replace the entry in the browser's history. */
  replace?: boolean;
};

/**
 * A route matcher resolves a URL to a route.
 *
 * @template M the matched route type.
 *
 * @param url the URL to resolve.
 *
 * @returns the matched route.
 */
export type RouteMatcher<M> = (url: string) => M;

/**
 * A function to convert the match from the router library to an object with `page` and `params`.
 *
 * @template M the matched route type.
 *
 * @param match the route match returned by the router library
 *
 * @returns the converted object.
 */
export type ConvertMatch<M> = (match: M) => ({ page: string, params: Params });

/**
 * Query string parse function.
 *
 * @param query the query string to parse.
 *
 * @returns the result of parsing the query string.
 */
export type QueryStringParse = (query: string) => Params;

/**
 * Query string stringify function.
 *
 * @param query the query string object.
 *
 * @returns the stringified query string.
 */
export type QueryStringStringify = (query: Params) => string;

/**
 * Query string library that provides the `parse` and `stringify` functions. This is only required
 * if your application needs query string support. Examples of query string libraries that work
 * out-of-the-box are:
 *
 * - [query-string](https://github.com/sindresorhus/query-string)
 * - [qs](https://github.com/ljharb/qs)
 * - [urlon](https://github.com/cerebral/urlon)
 *
 * Note that each library supports different features for query strings.
 */
export type QueryStringLib = {
  parse: QueryStringParse;
  stringify: QueryStringStringify;
};

/**
 * Function to convert a page and params to a route.
 *
 * @param page the page ID.
 * @param params the path parameters.
 *
 * @returns the route.
 */
export type ToRoute = (page: string, params?: Params) => Route;

/**
 * Function to generate a URL from a page ID and params.
 *
 * @param page the page ID.
 * @param params the path parameters.
 *
 * @returns the URL.
 */
export type ToUrl = (page: string, params?: Params) => string;

export type GetStatePath = (path: string) => string;

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
export type Start = (onRouteChange: OnRouteChange) => any;

export type SyncLocationBarParams = {
  page: string;
  params?: Params;
  replace?: boolean;
};

/**
 * Function that synchronizes the location bar with the state route.
 */
export type SyncLocationBar = (syncLocationBarParams: SyncLocationBarParams) => void;

/**
 * Built-in function to decode a URI.
 *
 * @param uri the URI.
 *
 * @returns the decoded URI.
 */
export type DecodeURI = (uri: string) => string;

/**
 * Built-in function to change the location.
 *
 * @param state the state object
 * @param title the document title - most browsers ignore this parameter
 * @param url the new history entry's URL
 */
export type PushState = (state: any, title: string, url: string) => void;

/**
 * Built-in callback function when the location changes.
 *
 * @param event the event.
 */
export type Onpopstate = (event: any) => void;

/**
 * Built-in `location` object, defined for testing purposes.
 */
export type Location = {
  hash: string;
  origin: string;
  pathname: string;
  search: string;
};

/**
 * Built-in `history` object, defined for testing purposes.
 */
export type History = {
  pushState: PushState;
};

/**
 * Built-in callback function to add an event listener.
 *
 * @param type
 * @param listener
 * @param options
 */
export type AddEventListener = (type: string, listener: any, options: any) => any;

/**
 * Built-in callback function to remove an event listener.
 */
export type RemoveEventListener = (type: string, listener: any) => any;

/**
 * Built-in `window` object, defined for testing purposes.
 */
export type Window = {
  /** Function to decode a URI. */
  decodeURI: DecodeURI;

  /** The current location. */
  location: Location;

  /** The window's history. */
  history: History;

  /** Callback function when the location changes. */
  onpopstate: Onpopstate;

  /** Function to add an event listener. */
  addEventListener: AddEventListener;

  /** Function to remove an event listener. */
  removeEventListener: RemoveEventListener;
};

/**
 * Configuration to create a router.
 *
 * @template M the matched route type.
 */
export type RouterConfig<M> = {
  /** The function that matches routes. */
  routeMatcher: RouteMatcher<M>;

  /** A function to convert a router library match to a route. */
  convertMatch: ConvertMatch<M>;

  /** The route configuration. If not provided, `toUrl` must be provided. */
  routeConfig?: RouteConfig;

  /** The `toUrl` function. If not provided, `routeConfig` must be provided and `toUrl` is
   * constructed from `routeConfig`. */
  toUrl?: ToUrl;

  /** If specified, uses history mode instead of hash mode. If you are using history mode, you need
   * to provide server side router support. If not provided, defaults to the identity function. */
  rootPath?: string;

  /** Whether to use a plain hash, `"#"`, instead of a hash-bang, `"#!"`. Defaults to `false`. The
   * `plainHash` option should not be specified (it will be ignored) if `rootPath` is specified. */
  plainHash?: boolean;

  /** The query string library to use. You only need to provide this if your application requires
   * query string support. */
  queryString?: QueryStringLib;

  /** The `window`, used for testing purposes. */
  wdw?: Window;
};

/**
 * This is the router that is created by {@link createRouter}.
 */
 export type Router = {
  /** The initial route as parsed from the location bar. */
  initialRoute: Route;

  /** Function to convert a page and params to a route. */
  toRoute: ToRoute;

  /** Function to convert a page and params to a route that will replace the current route in the
   * browser history. */
  replaceRoute: ToRoute;

  /** Function to generate a URL. */
  toUrl: ToUrl;

  /** Function to start the router. */
  start: Start;

  /** Function that synchronizes the location bar with the* state route. */
  syncLocationBar: SyncLocationBar;
};
