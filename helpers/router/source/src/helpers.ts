import qs from 'query-string';
import {
  DoSyncLocationBarParams,
  GetStatePath,
  RouteConfig,
  SetHref,
  ToUrl,
  WindowLike
} from './types';

// ----- Helpers

const stripTrailingSlash = (url: string) =>
  url.length === 0 || url === '/'
    ? '/'
    : (url.endsWith('/') ? url.substring(0, url.length - 1) : url);

const I = (x: string) => x;

export const getQuery = (path: string): string => {
  const idx = path.indexOf('?');
  return idx >= 0 ? path.substring(idx + 1) : '';
};

export const getQueryString = (queryParams = {}): string => {
  const query = qs.stringify(queryParams);
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

export const getConfig = (rootPath?: string) => {
  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : '#!';

  return { prefix, historyMode };
};

export const createGetUrl = (prefix: string, historyMode: boolean, wdw) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + '/');

/**
 * Helper that creates a `toUrl` function.
 */
const createToUrlFn = <T extends string = string>(routeConfig: RouteConfig<T>,
  getStatePath: GetStatePath): ToUrl => {

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  return (page, allParams = {}) => {
    const path = getStatePath(pathLookup[page]);
    const { params, queryParams } = separateParamsAndQueryParams(path, allParams);

    return (
      (path.match(/(:[^/]*)/g) || [] as Array<string>).reduce(
        (result: string, pathParam: string) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(queryParams)
    );
  };
};

export const createToUrl = <T extends string = string>(routeConfig: RouteConfig<T>,
  prefix: string, historyMode: boolean): ToUrl<T> => {

  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrl = createToUrlFn<T>(routeConfig, getStatePath);
  return (page, params = {}) => prefix + toUrl(page, params);
};

export const doSyncLocationBar = ({ replace, url, getUrl, wdw }: DoSyncLocationBarParams) => {
  if (url !== getUrl() && wdw) {
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
export const addHistoryEventListener = (wdw: WindowLike, prefix: string, setHref: SetHref) => {
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
