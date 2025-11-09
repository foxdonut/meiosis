import { MeiosisCell } from 'meiosis-setup/types';
import { Stream } from 'meiosis-setup/simple-stream';

/**
 * Types for `meiosis-router`.
 * @module
 */

export type RouteType = string | [string, RouteType];

/**
 * Route value. This is what is returned when obtaining a route from the router.
 *
 * @template T to restrict values to specific strings, or to subroutes.
 */
export type RouteValue<T extends RouteType> = T extends string
  ? string
  : T extends [infer V extends string, infer S extends RouteType]
  ? [V, RouteValue<S>]
  : never;

export type RouteConfigEntry<T extends RouteType> = T extends string
  ? string
  : T extends [infer V extends string, infer S extends RouteType]
  ? [V, RouteConfig<S>]
  : never;

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
 *
 * @template T to restrict values to specific strings. For example:
 *
 * ```ts
 * type Page = 'Home' | 'Login' | 'UserProfile';
 *
 * export const routeConfig: RouteConfig<Page> = {
 *   '/': 'Home',
 *   '/login': 'Login',
 *   '/user/:id': 'UserProfile'
 * };
 *
 * export const router = createRouter({ routeConfig });
 * ```
 *
 * This will provide auto-suggest and type safety for route values.
 *
 * ```ts
 * router.toRoute('invalid') // error
 * router.toUrl('invalid') // error
 * ```
 */
export type RouteConfig<T extends RouteType> = Record<string, RouteConfigEntry<T>>;

/**
 * Route path and query string parameters.
 */
export type Params = Record<string, any>;

/**
 * A route in the application state.
 *
 * @template T See {@link RouteConfig} for details.
 *
 */
export type Route<T extends RouteType> = {
  value: RouteValue<T>;
  params: Params;
  replace?: boolean;
};

/**
 * Function to generate a URL from a value and params.
 *
 * @template T See {@link RouteConfig} for details.
 *
 * @param value the route value.
 * @param params the path parameters and, optionally query parameters. Any parameters not part of
 * path parameters are automatically added as query parameters. Warning: if you do not specify
 * values for route path parameters, they will be `undefined` in the resulting URL.
 *
 * @returns the URL.
 */
export type ToUrl<T extends RouteType> = (value: RouteValue<T>, params?: Params) => string;

/**
 * Function to navigate to a URL from a value and params.
 *
 * @template T See {@link RouteConfig} for details.
 *
 * @param value the route value.
 * @param params the path parameters and, optionally query parameters. Any parameters not part of
 * path parameters are automatically added as query parameters. Warning: if you do not specify
 * values for route path parameters, they will be `undefined` in the resulting URL.
 *
 * @returns the URL.
 */
export type Navigate<T extends RouteType> =
  (value: RouteValue<T>, params?: Params, popstate?: boolean) => void;

/**
 * Function to generate a Route.
 *
 * @template T See {@link RouteConfig} for details.
 *
 * @param value the route value.
 * @param params the route parameters.
 * @param replace indicates whether to replace the entry in the browser's history instead of
 * appending. This is useful, for example, when redirecting from a route that the user was not
 * allowed to access.
 */
export type ToRoute<T extends RouteType> =
  (value: RouteValue<T>, params?: Params, replace?: boolean) => Route<T>;

/** Used internally. */
export type GetStatePath = (path: string) => string;

/** Used internally. */
export type SetHref = (href: string) => void;

/**
 * Callback function for when the route changes. This function should be used to update the route in
 * the application state. For example:
 *
 * ```js
 * router.start(route => cell.update({ route: () => route }));
 * ```
 *
 * @param route the current route.
 */
export type OnRouteChange<T extends RouteType> = (route: Route<T>) => void;

/**
 * Function to start the router.
 *
 * @param onRouteChange callback function for when the route changes. This should be used to update
 * the route in the application state. See {@link OnRouteChange}.
 */
export type Start<T extends RouteType> = (onRouteChange: OnRouteChange<T>) => void;

/** Do not use this, it is for internal testing purposes only. */
export type WindowLike = {
  decodeURI: (uri: string) => string;
  history: {
    pushState: (state: any, unused: string, url?: string) => any;
    replaceState: (state: any, unused: string, url?: string) => any;
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

/** Used internally. */
export type DoSyncLocationBarParams = {
  replace?: boolean;
  url: string;
  getUrl: () => string;
  wdw?: WindowLike;
};

/**
 * Function that synchronizes the location bar with the application state route. This should be done
 * when the application state changes, i.e.:
 *
 * ```ts
 * cells.map((cell) => {
 *   router.syncLocationBar(cell.state.route);
 * });
 * ```
 *
 * @template T See {@link RouteConfig} for details.
 *
 * @param route the current route.
 */
export type SyncLocationBar<T extends RouteType> = (route: Route<T>) => void;

/**
 * Configuration to create a router.
 *
 * @template T See {@link RouteConfig} for details.
 */
export type RouterConfig<T extends RouteType> = {
  /** The route configuration. See the documentation for {@link RouteConfig} for details. */
  routeConfig: RouteConfig<T>;

  /** If specified, uses history mode instead of hash mode. To use history mode, you need to provide
   * server side router support. The root path is the URL path leading up to the root of your
   * application. For example, if the URL of your application is `https://my.domain.com/apps/myapp`
   * then the root path is `/apps/myapp`. If your application is at `https://my.domain.com` then
   * simply specify an empty string, `''`, as the root path. */
  rootPath?: string;

  /** Do not use this, it is for internal testing purposes only. */
  wdw?: WindowLike;
};

/**
 * Defines the `route` property where to store the route in the Meiosis application state.
 *
 * @template T See {@link RouteConfig} for details.
 */
export type WithRoute<T extends RouteType> = {
  route: Route<T>;
};

/**
 * Router created by {@link "index".createRouter}.
 *
 * @template T See {@link RouteConfig} for details.
 */
export type Router<T extends RouteType> = {
  /** The initial route as parsed from the location bar. */
  initialRoute: Route<T>;

  /** Returns the current route. */
  getCurrentRoute: () => Route<T>;

  /** Function to generate a URL. */
  toUrl: ToUrl<T>;

  /** Function to navigate to a URL. */
  navigate: Navigate<T>;

  /** Function to generate a Route. */
  toRoute: ToRoute<T>;

  /** Function to start the router. */
  start: Start<T>;

  /** Function that synchronizes the location bar with the application state route. */
  syncLocationBar: SyncLocationBar<T>;

  /** Convenience function that calls start, map, and syncLocation bar for you. */
  setup: <P extends WithRoute<T>>(cells: Stream<MeiosisCell<P>>) => void;
};
