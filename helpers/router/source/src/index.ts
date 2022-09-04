import {
  addHistoryEventListener,
  createGetUrl,
  createToUrl,
  doSyncLocationBar,
  emptyQueryString,
  getConfig,
  getQuery,
  replaceRoute,
  toRoute
} from './util';

/**
 * @template M
 * Creates a router.
 *
 * @param {RouterConfig<M>} config
 *
 * @return {Router} the created router.
 */
export const createRouter = ({
  routeMatcher,
  convertMatch,
  routeConfig,
  toUrl,
  rootPath,
  plainHash = false,
  queryString = emptyQueryString,
  wdw = window
}) => {
  if (!routeMatcher) {
    throw 'routeMatcher is required';
  }

  if (!convertMatch) {
    throw 'convertMatch is required';
  }

  if (!routeConfig && !toUrl) {
    throw 'routeConfig or toUrl is required';
  }

  const { prefix, historyMode } = getConfig(rootPath, plainHash);

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || '/';
  toUrl = createToUrl(routeConfig, prefix, queryString, historyMode, toUrl);

  const getRoute = (path) => {
    let matchPath = path || '/';
    if (matchPath.startsWith('?')) {
      matchPath = '/' + matchPath;
    }
    const match = routeMatcher(matchPath);
    const converted = convertMatch(match);
    const queryParams = queryString.parse(getQuery(path));
    const params = Object.assign(queryParams, converted.params);

    return Object.assign(converted, { params });
  };

  const initialRoute = getRoute(getPath());

  const start = (onRouteChange) => {
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

  const syncLocationBar = ({ page, params, replace }) => {
    doSyncLocationBar({ replace, url: toUrl(page, params), getUrl, wdw });
  };

  return { initialRoute, toRoute, replaceRoute, toUrl, start, syncLocationBar };
};
