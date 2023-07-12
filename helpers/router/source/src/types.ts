import { MeiosisCell } from 'meiosis-setup/types';
import { Stream } from 'meiosis-setup/simple-stream';

/**
 * Types for `meiosis-router`.
 * @module
 */

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
export type RouteConfig<T extends string = string> = Record<string, T>;

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
export type Route<T extends string = string> = {
  /** The route value. */
  value: T;

  /** The path and query parameters. */
  params: Params;

  /** Indicates whether to replace the entry in the browser's history. See {@link ToRoute} for more
   * details. */
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
export type ToUrl<T extends string = string> = (value: T, params?: Params) => string;

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
export type ToRoute<T extends string = string> =
  (value: T, params?: Params, replace?: boolean) => Route<T>;

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
export type OnRouteChange<T extends string = string> = (route: Route<T>) => void;

/**
 * Function to start the router.
 *
 * @param onRouteChange callback function for when the route changes. This should be used to update
 * the route in the application state. See {@link OnRouteChange}.
 */
export type Start<T extends string = string> = (onRouteChange: OnRouteChange<T>) => void;

/** Do not use this, it is for internal testing purposes only. */
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
export type SyncLocationBar<T extends string = string> = (route: Route<T>) => void;

/**
 * Configuration to create a router.
 *
 * @template T See {@link RouteConfig} for details.
 */
export type RouterConfig<T extends string = string> = {
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

export type WithRoute<T extends string> = {
  route: Route<T>;
};

/**
 * Router created by {@link "index".createRouter}.
 *
 * @template T See {@link RouteConfig} for details.
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

  /** Function that synchronizes the location bar with the application state route. */
  syncLocationBar: SyncLocationBar<T>;

  /** Convenience function that calls start, map, and syncLocation bar. */
  setup: <P extends WithRoute<T>>(cells: Stream<MeiosisCell<P>>) => void;
};
