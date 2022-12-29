import createRouteMatcher from 'feather-route-matcher';
import qs from 'query-string';
import {
  OnRouteChange,
  Params,
  Route,
  Router,
  RouterConfig,
  ToRoute,
  ToUrl
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
 * Creates a router.
 */
export const createRouter = <T extends string = string>({
  routeConfig,
  rootPath,
  wdw = window
}: RouterConfig<T>): Router<T> => {
  const routeMatcher = createRouteMatcher(routeConfig);
  const { prefix, historyMode } = getConfig(rootPath);

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || '/';
  const toUrl: ToUrl<T> = createToUrl(routeConfig, prefix, historyMode);
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

  return { initialRoute, toUrl, toRoute, start, syncLocationBar };
};
