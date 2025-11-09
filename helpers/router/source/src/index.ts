/**
 * `meiosis-router` main module.
 * @module
 */

import createRouteMatcher from 'feather-route-matcher';
import qs from 'query-string';
import { MeiosisCell } from 'meiosis-setup/types';
import { Stream } from 'meiosis-setup/simple-stream';
import {
  Navigate,
  OnRouteChange,
  Params,
  Route,
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
  getConfig,
  getQuery
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
export const createRouter = <T = string>(routerConfig: RouterConfig<T>):
  Router<T> => {

  const { routeConfig, rootPath, wdw = window } = routerConfig;

  const flattenedRouteConfig = flattenRouteConfig(routeConfig);

  const routeMatcher = createRouteMatcher(flattenedRouteConfig);
  const { prefix, historyMode } = getConfig(rootPath);

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || '/';
  const toUrl: ToUrl<T> = createToUrl(routeConfig, prefix, historyMode);

  const navigate: Navigate<T> = (value: RouteValue<T>, params?: Params, popstate?: boolean) => {
    const url = toUrl(value, params);
    wdw.history.pushState({}, '', url);
    if (popstate) {
      dispatchEvent(new PopStateEvent('popstate', { state: {} }));
    }
  };

  const toRoute: ToRoute<T> = (value: RouteValue<T>, params?: Params, replace?: boolean) =>
    ({ value, params: params || {}, replace });

  const getRoute = <T>(path: string | undefined): Route<T> => {
    let matchPath = path || '/';
    if (matchPath.startsWith('?')) {
      matchPath = '/' + matchPath;
    }
    const match = routeMatcher(matchPath);
    const queryParams = qs.parse(getQuery(path));
    const params = Object.assign(queryParams, match.params);
    const value: RouteValue<T> = expandRouteValue<T>(match.value);

    return { value, params };
  };

  const getCurrentRoute = () => getRoute(getPath());

  const initialRoute = getCurrentRoute();

  const start = (onRouteChange: OnRouteChange<T>) => {
    if (historyMode) {
      addHistoryEventListener(wdw, prefix, (href) => {
        wdw.history.pushState({}, '', href);
        if (wdw.onpopstate) {
          wdw.onpopstate(new PopStateEvent('router'));
        }
      });
    }
    wdw.onpopstate = () => onRouteChange(getRoute<T>(getPath()));
  };

  const syncLocationBar = ({ value, params, replace }: Route<T>) => {
    doSyncLocationBar({ replace, url: toUrl(value, params), getUrl, wdw });
  };

  const setup = <P extends WithRoute<T>>(cells: Stream<MeiosisCell<P>>) => {
    const cell = cells();

    start((route) => cell.update((state) => ({ ...state, route })));

    cells.map((cell) => {
      syncLocationBar(cell.state.route);
    });
  };

  return { initialRoute, getCurrentRoute, navigate, toUrl, toRoute, start, syncLocationBar, setup };
};
