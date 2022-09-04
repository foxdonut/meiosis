import {
  OnRouteChange,
  RouteConfig,
  SyncLocationBar,
  ToRoute,
  ToUrl
} from './types';
import m from 'mithril';

/**
 * Parameters to `createMithrilRoutes`.
 */
export type CreateMithrilRoutesConfig = {
  onRouteChange: OnRouteChange;
  render: m.RouteResolver['render'];
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
export type CreateMithrilRoutes = (config: CreateMithrilRoutesConfig) => m.RouteDefs;

/**
 * Configuration to create a Mithril router.
 */
export type MithrilRouterConfig = {
  /** The Mithril instance. */
  m: m.Static;

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
