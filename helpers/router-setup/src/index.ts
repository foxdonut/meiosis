/**
 * `meiosis-router-setup`
 *
 * The `router-setup` module contains functions for creating a router by plugging in a router
 * library.
 *
 * @module routerSetup
 */

/**
 * Route params.
 */
export type Params = Record<string, any>;

export interface RouteConfig {
  [id: string]: string;
}

export type FeatherRouterStart = (callback: { navigateTo: (route: FeatherRoute) => void }) => void;

export interface FeatherRoute {
  page: string;
  params: Params;
  url: string;
  pattern: string;
}

export type FeatherRouteMatcher = (path: string) => FeatherRoute;

export type FeatherCreateRouteMatcher = (routeConfig: RouteConfig) => FeatherRouteMatcher;

export interface FeatherRouter {
  initialRoute: FeatherRoute;
  routeMatcher: FeatherRouteMatcher;
  start: FeatherRouterStart;
  locationBarSync: (route: FeatherRoute) => void;
}

////////

export const createFeatherRouter = (
  createRouteMatcher: FeatherCreateRouteMatcher,
  routeConfig: RouteConfig
): FeatherRouter => {
  const prefix = "#";

  const getPath = (): string =>
    decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const routeMatcher = createRouteMatcher(routeConfig);

  const initialRoute = routeMatcher(getPath());

  const start: FeatherRouterStart = ({ navigateTo }) => {
    window.onpopstate = (): void => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = (route: FeatherRoute): void => {
    const path = route.url;

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, routeMatcher, start, locationBarSync };
};
