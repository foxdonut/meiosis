import {
  OnRouteChange,
  QueryStringParse,
  QueryStringStringify,
  RouteConfig,
  SyncLocationBar,
  ToRoute,
  ToUrl
} from './types';

/**
 * Mithril route property.
 *
 * @property {string} prefix
 */
export type MithrilDotRoute = {
  prefix: string;
  set: (url: string) => void;
};

/**
 * Mithril instance.
 */
export type Mithril = {
  route: MithrilDotRoute;
  buildQueryString: QueryStringStringify;
  parseQueryString: QueryStringParse;
};

/**
 * Configuration to create a Mithril router.
 */
export type MithrilRouterConfig = {
  /** The Mithril instance. */
  m: Mithril;

  /** The route configuration. */
  routeConfig: RouteConfig;

  /** If specified, uses history mode instead of hash mode. If you * are using history mode, you
   * need to provide server side router support. */
  rootPath?: string;

  /** Whether to use a plain hash, `"#"`, instead of a hash-bang, * `"#!"`. Defaults to `false`. The
   * `plainHash` option should not be specified (it will be ignored) * if `historyMode` is `true`.
   * */
  plainHash?: boolean;

  /** The `window`, used for testing purposes. */
  wdw?: Window;
};

/**
 * Mithril `onmatch` function.
 */
export type MithrilOnmatch = (params: any, url: string) => void;

/**
 * Mithril `render` function.
 */
export type MithrilRender = (vnode: any, attrs: any) => any;

/**
 * Mithril route.
 */
export type MithrilRoute = {
  onmatch: MithrilOnmatch;
  render: MithrilRender;
};

/**
 * Mithril routes.
 */
export type MithrilRoutes = Record<string, MithrilRoute>;

/**
 * Parameters to `createMithrilRoutes`.
 */
export type CreateMithrilRoutesConfig = {
  onRouteChange: OnRouteChange;
  render: any;
};

/**
 * Creates Mithril routes suitable for passing as the third argument to `m.route`, for example:
 *
 * ```js
 * m.route(
 *   document.getElementById("app"),
 *   "/",
 *   router.createMithrilRoutes({
 *     onRouteChange: route => update({ route: () => route }),
 *     App, states, update, actions
 *   })
 * );
 * ```
 */
export type CreateMithrilRoutes = (config: CreateMithrilRoutesConfig) => MithrilRoutes;

/**
 * This is the router that is created by {@link createMithrilRouter}.
 */
export type MithrilRouter = {
  /** Creates Mithril routes suitable for passing * as the third argument to `m.route`. */
  createMithrilRoutes: CreateMithrilRoutes;

  /** Function to convert a page and params to a route. */
  toRoute: ToRoute;

  /** Function to convert a page and params to a route that will * replace the current route in the
   * browser history. */
  replaceRoute: ToRoute;

  /** Function to generate a URL. */
  toUrl: ToUrl;

  /** Function that synchronizes the location bar with the * state route. */
  syncLocationBar: SyncLocationBar;
};
