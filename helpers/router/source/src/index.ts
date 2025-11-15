/**
 * `meiosis-router` main module.
 * @module
 */

import createRouteMatcher from 'feather-route-matcher';
import qs from 'query-string';
import { MeiosisCell } from 'meiosis-setup/types';
import { Stream } from 'meiosis-setup/simple-stream';
import {
  ListenerValue,
  Navigate,
  OnListener,
  OnRouteChange,
  OnRouteListener,
  Params,
  Route,
  RouteListener,
  RouteValue,
  Router,
  RouterConfig,
  ToRoute,
  ToUrl,
  WithRoute
} from './types';
import {
  addHistoryEventListener,
  createGetUrl,
  createToUrl,
  doSyncLocationBar,
  expandRouteValue,
  flattenRouteConfig,
  flattenRouteValue,
  getConfig,
  getQuery,
  getSubroute,
  getTopRouteValue
} from './helpers';

/**
 * Creates a router for use with Meiosis.
 *
 * Required:
 * - `routeConfig`: the mapping of route paths to string identifiers. See
 * {@link "types".RouteConfig} for details.
 *
 * Optional:
 * - `rootPath` (`string`): indicates to use history mode instead of hash mode by specifying the
 * root path. See {@link "types".RouterConfig} for details.
 */
export const createRouter = <T extends RouteValue = RouteValue>(routerConfig: RouterConfig<T>):
  Router<T> => {

  const { routeConfig, rootPath, wdw = window } = routerConfig;

  const flattenedRouteConfig = flattenRouteConfig(routeConfig);

  const routeMatcher = createRouteMatcher(flattenedRouteConfig);
  const { prefix, historyMode } = getConfig(rootPath);

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || '/';
  const toUrl: ToUrl<T> = createToUrl<T>(routeConfig, prefix, historyMode);

  const navigate: Navigate<T> = (value: T, params?: Params, popstate?: boolean) => {
    const url = toUrl(value, params);
    wdw.history.pushState({}, '', url);
    if (popstate) {
      dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }
  };

  const toRoute: ToRoute<T> = (value: T, params?: Params, replace?: boolean) =>
  ({
    value, params: params || {}, top: getTopRouteValue(value), replace,
    subroute: getSubroute(value, params || {})
  });

  const getRoute = (path: string | undefined): Route<T> => {
    let matchPath = path || '/';
    if (matchPath.startsWith('?')) {
      matchPath = '/' + matchPath;
    }
    const match = routeMatcher(matchPath);
    const queryParams = qs.parse(getQuery(path));
    const params = Object.assign(queryParams, match.params);
    const value: T = expandRouteValue<T>(match.value);

    return { value, top: getTopRouteValue(value), params, subroute: getSubroute(value, params) };
  };

  const getCurrentRoute = () => getRoute(getPath());

  const initialRoute = getCurrentRoute();
  let previousRoute = initialRoute;

  const onListeners: RouteListener<T>[] = [];

  const listen: OnRouteListener<T> = (value: ListenerValue<T>, callbacks: OnListener<T>) => {
    onListeners.push({ value, callbacks });
  };

  const notifyListeners = (route: Route<T>, previousRoute: Route<T>) => {
    if (route.value === previousRoute.value &&
      JSON.stringify(route.params) === JSON.stringify(previousRoute.params)) {

      return;
    }

    const previousRouteValue = flattenRouteValue(previousRoute.value);
    const routeValue = flattenRouteValue(route.value);

    onListeners.forEach((listener) => {
      const listenerValue = flattenRouteValue(listener.value);

      const callbacks: Array<OnRouteChange<T> | undefined> = [];

      if (routeValue.startsWith(listenerValue)) {
        callbacks.push(listener.callbacks.change);
        if (!previousRouteValue.startsWith(listenerValue)) {
          callbacks.push(listener.callbacks.enter);
        }
      } else if (previousRouteValue.startsWith(listenerValue)) {
        callbacks.push(listener.callbacks.exit);
      }

      for (const callback of callbacks) {
        if (callback) {
          callback(route);
        }
      }
    });
  };

  const initNotifyListeners = (route: Route<T>) => {
    const routeValue = flattenRouteValue(route.value);

    onListeners.forEach((listener) => {
      const listenerValue = flattenRouteValue(listener.value);

      if (routeValue.startsWith(listenerValue)) {
        listener.callbacks.enter && listener.callbacks.enter(route);
        listener.callbacks.change && listener.callbacks.change(route);
      }
    });
  };

  const start = (onRouteChange?: OnRouteChange<T>) => {
    if (historyMode) {
      addHistoryEventListener(wdw, prefix, (href) => {
        wdw.history.pushState({}, '', href);
        if (wdw.onpopstate) {
          wdw.onpopstate(new PopStateEvent('router'));
        }
      });
    }

    wdw.onpopstate = () => {
      // Always get the latest route in case something changed in the meantime.
      notifyListeners(getRoute(getPath()), previousRoute);
      if (onRouteChange) {
        onRouteChange(getRoute(getPath()));
      }
      previousRoute = getRoute(getPath());
    };

    initNotifyListeners(initialRoute);
  };

  const syncLocationBar = ({ value, params, replace }: Route<T>) => {
    doSyncLocationBar({ replace, url: toUrl(value, params), getUrl, wdw });
  };

  const setup = <P extends WithRoute<T>>(cells: Stream<MeiosisCell<P>>) => {
    const cell = cells();

    start((route) => cell.update((state) => ({ ...state, route })));

    cells.map((cell) => {
      syncLocationBar(cell.getState().route);
    });
  };

  return {
    initialRoute,
    getCurrentRoute,
    listen,
    navigate,
    toUrl,
    toRoute,
    start,
    syncLocationBar,
    setup
  };
};
