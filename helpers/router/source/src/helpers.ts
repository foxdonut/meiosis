/**
 * Contains helper functions for internal use only.
 * @module
 */
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

const stripTrailingSlash = (url: string): string =>
  url.length === 0 || url === '/'
    ? '/'
    : (url.endsWith('/') ? url.substring(0, url.length - 1) : url);

const I = (x: string) => x;

/** For internal use only. */
export const getQuery = (path: string | undefined): string => {
  if (path) {
    const idx = path.indexOf('?');
    return idx >= 0 ? path.substring(idx + 1) : '';
  }
  return '';
};

/** For internal use only. */
export const getQueryString = (queryParams = {}): string => {
  const query = qs.stringify(queryParams);
  return (query.length > 0 ? '?' : '') + query;
};

const separateParamsAndQueryParams = (path: string, allParams: Record<string, string>) => {
  const pathParams = (path.match(/(:[^/]*)/g) || []).map((key) => key.substring(1));

  return Object.entries(allParams).reduce(
    (result, [key, value]) => {
      const slot = pathParams.indexOf(key) >= 0 ? 'params' : 'queryParams';
      result[slot][key] = value;
      return result;
    },
    { params: {} as Record<string, string>, queryParams: {} as Record<string, string> }
  );
};

/** For internal use only. */
export const getConfig = (rootPath?: string) => {
  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : '#!';

  return { prefix, historyMode };
};

/** For internal use only. */
export const createGetUrl = (prefix: string, historyMode: boolean, wdw: WindowLike) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + '/');

const createToUrlFn = <T extends string = string>(routeConfig: RouteConfig<T>,
  getStatePath: GetStatePath): ToUrl => {

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {} as Record<string, string>
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

/** For internal use only. */
export const createToUrl = <T extends string = string>(routeConfig: RouteConfig<T>,
  prefix: string, historyMode: boolean): ToUrl<T> => {

  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrl = createToUrlFn<T>(routeConfig, getStatePath);
  return (page, params = {}) => prefix + toUrl(page, params);
};

/** For internal use only. */
export const doSyncLocationBar = (doSyncParams: DoSyncLocationBarParams) => {
  const { replace, url, getUrl, wdw } = doSyncParams;
  if (url !== getUrl() && wdw) {
    const fn = replace ? 'replaceState' : 'pushState';
    wdw.history[fn].call(wdw.history, {}, '', url);
  }
};

/** For internal use only. */
export const addHistoryEventListener = (wdw: WindowLike, prefix: string, setHref: SetHref) => {
  const origin = wdw.location.origin;

  const linkHandler = (evt: { target: HTMLAnchorElement | null; preventDefault: () => void; }) => {
    let element = evt.target;
    while (element && element.nodeName.toLowerCase() !== 'a') {
      element = element.parentNode as HTMLAnchorElement | null;
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
