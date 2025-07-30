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
export const createRouter = <T extends string = string>(routerConfig: RouterConfig<T>):
  Router<T> => {

  const { routeConfig, rootPath, wdw = window } = routerConfig;

  const routeMatcher = createRouteMatcher(routeConfig);
  const { prefix, historyMode } = getConfig(rootPath);

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || '/';
  const toUrl: ToUrl<T> = createToUrl(routeConfig, prefix, historyMode);

  const navigate: Navigate<T> = (value: T, params?: Params) => {
    const url = toUrl(value, params);
    wdw.history.pushState({}, '', url);
  };

  const toRoute: ToRoute<T> = (value: T, params?: Params, replace?: boolean) =>
    ({ value, params: params || {}, replace });

  const getRoute = (path) => {
    let matchPath = path || '/';
    if (matchPath.startsWith('?')) {
      matchPath = '/' + matchPath;
    }
    const match = routeMatcher(matchPath);
    const queryParams = qs.parse(getQuery(path));
    const params = Object.assign(queryParams, match.params);

    return Object.assign(match, { params });
  };

  const initialRoute = getRoute(getPath());

  const start = (onRouteChange: OnRouteChange<T>) => {
    if (historyMode) {
      addHistoryEventListener(wdw, prefix, (href) => {
        wdw.history.pushState({}, '', href);
        if (wdw.onpopstate) {
          wdw.onpopstate(new PopStateEvent('router'));
        }
      });
    }
    wdw.onpopstate = () => onRouteChange(getRoute(getPath()));
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

  return { initialRoute, navigate, toUrl, toRoute, start, syncLocationBar, setup };
};
