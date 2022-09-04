import { GetStatePath, QueryStringLib, RouteConfig, ToUrl } from './types';

// ----- Helpers

const stripTrailingSlash = (url: string) =>
  (url.endsWith('/') ? url.substring(0, url.length - 1) : url);

const I = (x: string) => x;

const getQuery = (path: string): string => {
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

const getConfig = (rootPath: string, plainHash: boolean) => {
  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : '#' + (plainHash ? '' : '!');

  return { prefix, historyMode };
};

const toRoute = (page, params = {}) => ({ page, params, changed: true });
const replaceRoute = (page, params = {}) => ({ page, params, changed: true, replace: true });

const createGetUrl = (prefix, historyMode, wdw) =>
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

const createToUrl = (routeConfig, prefix, queryString, historyMode, toUrl?) => {
  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrlFn = toUrl || ToUrl(routeConfig, getStatePath, queryString);
  return (page, params = {}) => prefix + toUrlFn(page, params);
};

const emptyQueryString = {
  parse: (_) => ({}),
  stringify: (_) => ''
};

const doSyncLocationBar = ({ replace, url, getUrl, wdw }) => {
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
const addEventListener = (wdw, prefix, setHref) => {
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

// ----- Generic router

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

    return Object.assign(converted, { params, changed: true });
  };

  const initialRoute = getRoute(getPath());

  const start = (onRouteChange) => {
    if (historyMode) {
      addEventListener(wdw, prefix, (href) => {
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

/**
 * Helper for route change effects.
 */
export const RouteChangeEffect = ({
  update,
  Effects,
  isRouteChanged = (state) => state.route.changed,
  routeChangedPatch = { route: { changed: false } }
}) => {
  const routeChangeUpdate = (patch) => update([patch, routeChangedPatch]);
  const effects = Effects.map((Effect) => Effect(routeChangeUpdate));

  return (state) => {
    if (isRouteChanged(state)) {
      effects.forEach((effect) => effect(state));
    }
  };
};

// ----- Mithril

/**
 * Configuration to create a Mithril router.
 *
 * @typedef {Object} MithrilRouterConfig
 *
 * @property {m} m the Mithril instance.
 * @property {RouteConfig} routeConfig the route configuration.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side router support.
 * @property {boolean} [plainHash=false] whether to use a plain hash, `"#"`, instead of a hash-bang,
 * `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
 * if `historyMode` is `true`.
 * @property {Window} [wdw=window] the `window`, used for testing purposes.
 */

/**
 * Mithril `onmatch` function.
 *
 * @callback MithrilOnmatch
 *
 * @param {any} params
 * @param {string} url
 *
 * @return {void}
 */

/**
 * Mithril `render` function.
 *
 * @callback MithrilRender
 *
 * @param {any} [vnode] vnode
 * @param {any} [attrs] attrs
 *
 * @return {any} vnode
 */

/**
 * Mithril route.
 *
 * @typedef {Object} MithrilRoute
 *
 * @property {MithrilOnmatch} onmatch
 * @property {MithrilRender} render
 */

/**
 * Mithril routes.
 *
 * @typedef {Object<string,MithrilRoute>} MithrilRoutes
 */

/**
 * Parameters to `createMithrilRoutes`.
 *
 * @typedef {Object} CreateMithrilRoutesConfig
 *
 * @property {OnRouteChange} onRouteChange
 * @property {any} render
 */

/**
 * Creates Mithril routes suitable for passing as the third argument to `m.route`, for example:
 *
 * ```javascript
 * m.route(
 *   document.getElementById("app"),
 *   "/",
 *   router.createMithrilRoutes({
 *     onRouteChange: route => update({ route: () => route }),
 *     App, states, update, actions
 *   })
 * );
 * ```
 *
 * @callback CreateMithrilRoutes
 *
 * @param {CreateMithrilRoutesConfig} config
 *
 * @return {MithrilRoutes} Mithril routes.
 */

/**
 * This is the router that is created by {@link createMithrilRouter}.
 *
 * @typedef {Object} MithrilRouter
 *
 * @property {CreateMithrilRoutes} createMithrilRoutes creates Mithril routes suitable for passing
 * as the third argument to `m.route`.
 * @property {ToRoute} toRoute function to convert a page and params to a route.
 * @property {ToRoute} replaceRoute function to convert a page and params to a route that will
 * replace the current route in the browser history.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {SyncLocationBar} syncLocationBar function that synchronizes the location bar with the
 * state route.
 */

/**
 * Mithril route property.
 *
 * @typedef {Object} MithrilDotRoute
 *
 * @property {string} prefix
 */

/**
 * Mithril instance.
 *
 * @typedef {any} m
 *
 * @property {MithrilDotRoute} route
 * @property {QueryStringStringify} buildQueryString
 */

/**
 * Sets up a router using [Mithril Router](https://mithril.js.org/route.html).
 *
 * @param {MithrilRouterConfig} config
 *
 * @return {MithrilRouter}
 */
export const createMithrilRouter = ({
  m,
  routeConfig,
  rootPath,
  plainHash = false,
  wdw = window
}) => {
  if (!m) {
    throw 'm is required';
  }

  if (!routeConfig) {
    throw 'routeConfig is required';
  }

  const { prefix, historyMode } = getConfig(rootPath, plainHash);

  m.route.prefix = prefix;

  const queryString = { stringify: m.buildQueryString, parse: m.parseQueryString };
  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const toUrl = createToUrl(routeConfig, prefix, queryString, historyMode);

  const createMithrilRoutes = ({ onRouteChange, render }) => {
    if (historyMode) {
      const prefixLength = prefix.length;
      addEventListener(wdw, prefix, (href) => {
        m.route.set(href.substring(href.indexOf(prefix) + prefixLength));
      });
    }

    return Object.keys(routeConfig).reduce((result, path) => {
      const page = routeConfig[path];
      result[path] = {
        onmatch: (params) => onRouteChange({ page, params, changed: true }),
        render
      };
      return result;
    }, {});
  };

  const syncLocationBar = ({ page, params, replace }) => {
    if (page) {
      doSyncLocationBar({ replace, url: toUrl(page, params), getUrl, wdw });
    }
  };

  return { createMithrilRoutes, toRoute, replaceRoute, toUrl, syncLocationBar };
};
