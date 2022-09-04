import { GetStatePath, QueryStringLib, RouteConfig, ToUrl } from './types';

// ----- Helpers

const stripTrailingSlash = (url: string) =>
  (url.endsWith('/') ? url.substring(0, url.length - 1) : url);

const I = (x: string) => x;

export const getQuery = (path: string): string => {
  const idx = path.indexOf('?');
  return idx >= 0 ? path.substring(idx + 1) : '';
};

export const getQueryString = (queryString: QueryStringLib, queryParams = {}): string => {
  const query = queryString.stringify(queryParams);
  return (query.length > 0 ? '?' : '') + query;
};

const separateParamsAndQueryParams = (path: string, allParams) => {
  const pathParams = (path.match(/(:[^/]*)/g) || []).map((key) => key.substring(1));

  return Object.entries(allParams).reduce(
    (result, [key, value]) => {
      const slot = pathParams.indexOf(key) >= 0 ? 'params' : 'queryParams';
      result[slot][key] = value;
      return result;
    },
    { params: {}, queryParams: {} }
  );
};

export const getConfig = (rootPath?: string, plainHash?: boolean) => {
  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : '#' + (plainHash ? '' : '!');

  return { prefix, historyMode };
};

export const toRoute = (page, params = {}) => ({ page, params });
export const replaceRoute = (page, params = {}) => ({ page, params, replace: true });

export const createGetUrl = (prefix, historyMode, wdw) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + '/');

/**
 * Helper that creates a `toUrl` function.
 */
const ToUrl = (routeConfig: RouteConfig, getStatePath: GetStatePath,
  queryString: QueryStringLib): ToUrl => {

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  return (page, allParams = {}) => {
    const path = getStatePath(pathLookup[page]);
    const { params, queryParams } = separateParamsAndQueryParams(path, allParams);

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(queryString, queryParams)
    );
  };
};

export const createToUrl = (routeConfig, prefix, queryString, historyMode, toUrl?) => {
  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrlFn = toUrl || ToUrl(routeConfig, getStatePath, queryString);
  return (page, params = {}) => prefix + toUrlFn(page, params);
};

export const emptyQueryString = {
  parse: (_) => ({}),
  stringify: (_) => ''
};

export const doSyncLocationBar = ({ replace, url, getUrl, wdw }) => {
  if (url !== getUrl()) {
    const fn = replace ? 'replaceState' : 'pushState';
    wdw.history[fn].call(wdw.history, {}, '', url);
  }
};

/**
 * Helper to intercept link clicks in history mode.
 *
 * @param {Window} wdw
 * @param {string} prefix
 * @param {function(string):void} setHref
 */
export const addHistoryEventListener = (wdw, prefix, setHref) => {
  const origin = wdw.location.origin;

  const linkHandler = (evt) => {
    let element = evt.target;
    while (element && element.nodeName.toLowerCase() !== 'a') {
      element = element.parentNode;
    }
    if (
      element &&
      element.nodeName.toLowerCase() === 'a' &&
      element.href.startsWith(origin) &&
      element.href.indexOf(prefix) >= 0
    ) {
      evt.preventDefault();
      setHref(element.href);
    }
  };

  wdw.addEventListener('click', linkHandler, false);

  wdw.addEventListener('beforeunload', () => {
    wdw.removeEventListener('click', linkHandler);
  });
};
