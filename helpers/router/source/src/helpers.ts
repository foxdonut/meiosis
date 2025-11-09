/**
 * Contains helper functions for internal use only.
 * @module
 */
import qs from 'query-string';
import {
  DoSyncLocationBarParams,
  GetStatePath,
  RouteConfig,
  RouteConfigEntry,
  RouteType,
  RouteValue,
  SetHref,
  ToUrl,
  WindowLike
} from './types';

// ----- Helpers

const routeValueSeparator = '__';

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

const flattenRouteValue = <T extends RouteType>(routeValue: RouteValue<T>): string => {
  if (typeof routeValue === 'string') {
    return routeValue;
  } else if (Array.isArray(routeValue)) {
    return routeValue.flat().join(routeValueSeparator);
  } else {
    throw new Error(`Invalid routeValue: ${routeValue}`);
  }
};

const flattenRouteEntry = <T extends RouteType>(parent: string, rootPath: string,
  result: Record<string, string>, [path, value]: [path: string, value: RouteConfigEntry<T>]) => {

  if (typeof value === 'string') {
    const nextValue = parent.length > 0 ? `${parent}${routeValueSeparator}${value}` : value;
    return Object.assign(result, { [rootPath + path]: nextValue });
  } else if (Array.isArray(value) && value.length === 2) {
    const subrouteValue = value[0];

    if (typeof subrouteValue !== 'string') {
      throw new Error(`Invalid routeConfig value for path "${path}": ${subrouteValue}`);
    }

    const nextParent = parent.length > 0
      ? `${parent}${routeValueSeparator}${subrouteValue}`
      : subrouteValue;

    return Object.assign(result, flattenRouteConfig(value[1], nextParent, rootPath + path));
  } else {
    throw new Error(`Invalid routeConfig value for path "${path}": ${value}`);
  }
};

/** For internal use only. */
export const flattenRouteConfig = <T extends RouteType>(routeConfig: RouteConfig<T>,
  parent = '', rootPath = ''): Record<string, string> => {

  return Object.entries(routeConfig).reduce((result, next) =>
    flattenRouteEntry(parent, rootPath, result, next), {} as Record<string, string>);
};

/** For internal use only. */
export const expandRouteValue = <T extends RouteType>(routeValue: string): RouteValue<T> => {
  const parts = routeValue.split(routeValueSeparator);
  if (parts.length === 1) {
    return parts[0] as RouteValue<T>;
  }
  return [parts[0], expandRouteValue(parts.slice(1).join(routeValueSeparator))] as RouteValue<T>;
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

const createToUrlFn = <T extends RouteType>(routeConfig: RouteConfig<T>,
  getStatePath: GetStatePath): ToUrl<T> => {

  const pathLookup = Object.entries(flattenRouteConfig(routeConfig)).reduce(
    (result, [path, value]) => Object.assign(result, { [value]: path }),
    {} as Record<string, string>
  );

  return (value: RouteValue<T>, allParams = {}) => {
    const path = getStatePath(pathLookup[flattenRouteValue(value)]);
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
export const createToUrl = <T extends RouteType>(routeConfig: RouteConfig<T>,
  prefix: string, historyMode: boolean): ToUrl<T> => {

  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrl = createToUrlFn<T>(routeConfig, getStatePath);
  return (value: RouteValue<T>, params = {}) => prefix + toUrl(value, params);
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
