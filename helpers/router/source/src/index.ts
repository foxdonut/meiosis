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
  OnRouteUnlistener,
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
  equalRoutes,
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
  let onRouteChangeFn: OnRouteChange<T> | undefined;

  let onListeners: RouteListener<T>[] = [];

  const listen: OnRouteListener<T> = (value: ListenerValue<T>, callbacks: OnListener<T>) => {
    onListeners.push({ value, callbacks });
  };

  const unlisten: OnRouteUnlistener<T> = (value: ListenerValue<T>) => {
    const listenerValue = flattenRouteValue(value);
    onListeners = onListeners.filter((listener) =>
      flattenRouteValue(listener.value) !== listenerValue
    );
  };

  const notifyListeners = (route: Route<T>, previousRoute: Route<T>): Route<T> | undefined => {
    if (equalRoutes(route, previousRoute)) {
      return;
    }

    const previousRouteValue = flattenRouteValue(previousRoute.value);
    const routeValue = flattenRouteValue(route.value);

    let reRoute: Route<T> | undefined;

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
          reRoute = callback(route) || reRoute;
        }
      }
    });

    return reRoute;
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

  const handleRouteChange = (routeChange?: Route<T>): Route<T> => {
    const route = routeChange || getRoute(getPath());
    const reRoute = notifyListeners(route, previousRoute);

    if (reRoute) {
      return handleRouteChange(reRoute);
    }
    previousRoute = route;
    syncLocationBar(route);
    return route;
  };

  const start = (onRouteChange?: OnRouteChange<T>) => {
    onRouteChangeFn = onRouteChange;

    if (historyMode) {
      addHistoryEventListener(wdw, prefix, (href) => {
        wdw.history.pushState({}, '', href);
        if (wdw.onpopstate) {
          wdw.onpopstate(new PopStateEvent('router'));
        }
      });
    }

    wdw.onpopstate = (evt) => {
      if (!evt?.state?._meiosisRouter) {
        const route = handleRouteChange();
        if (onRouteChangeFn) {
          onRouteChangeFn(route);
        }
      }
    };

    initNotifyListeners(initialRoute);
  };

  const navigate: Navigate<T> = (value: T, params?: Params, replace?: boolean) => {
    const route = toRoute(value, params, replace);
    const reRoute = handleRouteChange(route);
    const url = toUrl(reRoute.value, reRoute.params);
    wdw.history.pushState({}, '', url);
    dispatchEvent(new PopStateEvent('popstate', { state: { _meiosisRouter: true } }));
    if (onRouteChangeFn) {
      onRouteChangeFn(reRoute);
    }
  };

  const syncLocationBar = ({ value, params, replace }: Route<T>) => {
    doSyncLocationBar({ replace, url: toUrl(value, params), getUrl, wdw });
  };

  const setup = <P extends WithRoute<T>>(cells: Stream<MeiosisCell<P>>) => {
    const cell = cells();

    start((route) => cell.update((state) => ({ ...state, route })));
  };

  return {
    initialRoute,
    getCurrentRoute,
    listen,
    unlisten,
    navigate,
    toUrl,
    toRoute,
    start,
    syncLocationBar,
    setup
  };
};
