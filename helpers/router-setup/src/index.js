// @ts-check

/**
 * Route configuration. This is a plain object that associates route path templates to string page
 * IDs. Route path templates may contain parameters by using `:` as a prefix. For example:
 *
 * ```javascript
 * const routeConfig = {
 *   "/": "Home",
 *   "/login": "Login",
 *   "/user/:id": "UserProfile"
 * };
 * ```
 *
 * @typedef {Object.<string, string>} RouteConfig
 */

/**
 * A route in the application state.
 *
 * @typedef {Object} Route
 *
 * @property {*} match the match returned by the router.
 * @property {*} queryParams an object with the query parameters.
 * @property {boolean} [replace] indicates whether to replace the entry in the browser's history.
 */

/**
 * A route matcher resolves a URL to a route.
 *
 * @callback RouteMatcher
 *
 * @param {string} url the URL to resolve.
 *
 * @return {*} the matched route.
 */

/**
 * A function to convert routes.
 *
 * @callback ConvertMatchToRoute
 *
 * @param {*} match the route match.
 * @param {*} queryParams the query params.
 *
 * @return {*} the converted route.
 */

/**
 * Query string parse function.
 *
 * @callback QueryStringParse
 *
 * @param {string} query the query string to parse.
 *
 * @return {Object.<string,any>} the result of parsing the query string.
 */

/**
 * Query string stringify function.
 *
 * @callback QueryStringStringify
 *
 * @param {Object.<string,any>} query the query string object.
 *
 * @return {string} the stringified query string.
 */

/**
 * Query string library that provides the `parse` and `stringify` functions. This is only required
 * if your application needs query string support. Examples of query string libraries that work
 * out-of-the-box are:
 *
 * - [query-string](https://github.com/sindresorhus/query-string)
 * - [qs](https://github.com/ljharb/qs)
 * - [urlon](https://github.com/cerebral/urlon)
 *
 * Note that each library supports different features for query strings.
 *
 * @typedef {Object} QueryStringLib
 *
 * @property {QueryStringParse} parse
 * @property {QueryStringStringify} stringify
 */

/**
 * Function to generate a URL from a page ID and params.
 *
 * @callback ToUrl
 *
 * @param {string} page the page ID.
 * @param {*} [params] the path parameters.
 * @param {*} [queryParams] the path parameters.
 *
 * @return {string} the URL.
 */

/**
 * Link handler function which calls `preventDefault` on the link event and emits the URL.
 *
 * @callback LinkHandler
 *
 * @param {Event} event
 *
 * @return {void}
 */

/**
 * Function to generate an event handler for a link.
 *
 * @callback GetLinkHandler
 *
 * @param {string} url the URL of the link.
 *
 * @return {LinkHandler} the link handler.
 */

/**
 * Callback function for when the route changes. Typically, this function updates the application
 * state with the route, for example:
 *
 * ```javascript
 * router.start(route => update({ route: () => route }));
 * ```
 *
 * @callback OnRouteChange
 *
 * @param {Route} route
 *
 * @return {void}
 */

/**
 * Function to start the router.
 *
 * @callback Start
 *
 * @param {OnRouteChange} onRouteChange callback function for when the route changes.
 *
 * @return {void}
 */

/**
 * @typedef {Object} SyncLocationBarParams
 *
 * @property {string} page
 * @property {*} params
 * @property {*} queryParams
 * @property {boolean} replace
 */

/**
 * Function that synchronizes the location bar with the state route.
 *
 * @callback SyncLocationBar
 *
 * @param {SyncLocationBarParams} syncLocationBarParams
 *
 * @return {void}
 */

/**
 * Built-in function to decode a URI.
 *
 * @callback DecodeURI
 *
 * @param {string} uri the URI.
 *
 * @return {string} the decoded URI.
 */

/**
 * Built-in function to change the location.
 *
 * @callback PushState
 *
 * @param {*} somethingFIXME
 * @param {string} somethingElseFIXME
 * @param {string} uri
 *
 * @return {void}
 */

/**
 * Built-in callback function when the location changes.
 *
 * @callback Onpopstate
 *
 * @param {*} event the event.
 *
 * @return {void}
 */

/**
 * Built-in `location` object, defined for testing purposes.
 *
 * @typedef {Object} Location
 *
 * @property {string} hash
 * @property {string} pathname
 * @property {string} search
 */

/**
 * Built-in `history` object, defined for testing purposes.
 *
 * @typedef {Object} History
 *
 * @property {PushState} pushState
 */

/**
 * Built-in `window` object, defined for testing purposes.
 *
 * @typedef {Object} Window
 *
 * @property {DecodeURI} decodeURI function to decode a URI.
 * @property {Location} location the current location.
 * @property {History} history the window's history.
 * @property {Onpopstate} onpopstate callback function when the location changes.
 */

/**
 * Configuration to create a hardcoded router.
 *
 * @typedef {Object} HardcodedRouterConfig
 *
 * @property {RouteMatcher} routeMatcher the function that matches routes.
 * @property {ConvertMatchToRoute} convertMatchToRoute a function to convert a match to a route.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side routing support.
 * @property {boolean} [plainHash=false] whether to use a plain hash, `"#"`, instead of a hash-bang,
 * `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
 * if `rootPath` is specified.
 * @property {QueryStringLib} [queryString] the query string library to use. You only need to
 * provide this if your application requires query string support.
 * @property {Window} [wdw=window] the `window`, used for testing purposes.
 */

/**
 * This is the router that is created by {@link createHardcodedRouter}.
 *
 * @typedef {Object} HardcodedRouter
 *
 * @property {Route} initialRoute the initial route as parsed from the location bar.
 * @property {*} toRoute FIXME
 * @property {*} replaceRoute FIXME
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {Start} start function to start the router.
 * @property {SyncLocationBar} syncLocationBar function that synchronizes the location bar with the
 * state route.
 * @property {GetLinkHandler} getLinkHandler when using history mode, ...
 */

/**
 * Configuration to create a programmatic router.
 *
 * @typedef {Object} ProgrammaticRouterConfig
 *
 * @property {RouteMatcher} routeMatcher the function that matches routes.
 * @property {ConvertMatchToRoute} convertMatchToRoute a function to convert a match to a route.
 * @property {RouteConfig} [routeConfig] the route configuration.
 * @property {ToUrl} [toUrl] the `toUrl` function.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side routing support.
 * @property {boolean} [plainHash=false] whether to use a plain hash, `"#"`, instead of a hash-bang,
 * `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
 * if `rootPath` is specified.
 * @property {QueryStringLib} [queryString] the query string library to use. You only need to
 * provide this if your application requires query string support.
 * @property {Window} [wdw=window] the `window`, used for testing purposes.
 */

/**
 * This is the router that is created by {@link createProgrammaticRouter}.
 *
 * @typedef {Object} ProgrammaticRouter
 *
 * @property {Route} initialRoute the initial route as parsed from the location bar.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {Start} start function to start the router.
 * @property {SyncLocationBar} syncLocationBar function that synchronizes the location bar with the
 * state route.
 * @property {GetLinkHandler} getLinkHandler when using history mode, ...
 */

const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);
const I = x => x;

const getPathWithoutQuery = path => path.replace(/\?.*/, "");

const getQuery = path => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

export const getQueryString = (queryString, queryParams = {}) => {
  const query = queryString.stringify(queryParams);
  return (query.length > 0 ? "?" : "") + query;
};

const createGetUrl = (prefix, historyMode, wdw) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + "/");

const createGetLinkHandler = wdw => url => evt => {
  evt.preventDefault();
  wdw.history.pushState({}, "", url);
  wdw.onpopstate(null);
};

const emptyQueryString = {
  parse: _ => ({}),
  stringify: _ => ""
};

const doSyncLocationBar = ({ replace, url, getUrl, wdw }) => {
  if (url !== getUrl()) {
    const fn = replace ? "replaceState" : "pushState";
    wdw.history[fn].call(wdw.history, {}, "", url);
  }
};

/**
 * Helper that creates a `toUrl` function.
 *
 * @param {RouteConfig} routeConfig
 * @param {*} getStatePath
 *
 * @return {ToUrl}
 */
const ToUrl = (routeConfig, getStatePath) => {
  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  return (page, params = {}) => {
    const path = getStatePath(pathLookup[page]);

    return (path.match(/(:[^/]*)/g) || []).reduce(
      (result, pathParam) =>
        result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
      path
    );
  };
};

/**
 * Creates a router that uses hardcoded URLs.
 *
 * @param {HardcodedRouterConfig} config
 *
 * @return {HardcodedRouter} the created router.
 */
export const createHardcodedRouter = ({
  routeMatcher,
  convertMatchToRoute,
  rootPath,
  plainHash = false,
  queryString = emptyQueryString,
  wdw = window
}) => {
  if (!routeMatcher) {
    throw "routeMatcher is required";
  }

  if (!convertMatchToRoute) {
    throw "convertMatchToRoute is required";
  }

  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : "#" + (plainHash ? "" : "!");

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || "/";

  const toRoute = (path, options) => {
    const matchPath = getPathWithoutQuery(path) || "/";
    const match = routeMatcher(matchPath);
    const queryParams = queryString.parse(getQuery(path));
    const url = prefix + path;

    return convertMatchToRoute({ match, queryParams, url, options });
  };

  const replaceRoute = path => toRoute(path, { replace: true });
  const initialRoute = toRoute(getPath());
  const toUrl = path => prefix + path;

  const start = onRouteChange => {
    const routeChange = () => onRouteChange(toRoute(getPath()));
    routeChange();
    wdw.onpopstate = routeChange;
  };

  const syncLocationBar = route => {
    const url = route.url;

    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      wdw.history[fn].call(wdw.history, {}, "", url);
    }
  };

  const getLinkHandler = createGetLinkHandler(wdw);

  return { initialRoute, toUrl, start, syncLocationBar, getLinkHandler, toRoute, replaceRoute };
};

/**
 * Creates a router that uses programmatic URLs.
 *
 * @param {ProgrammaticRouterConfig} config
 *
 * @return {ProgrammaticRouter} the created router.
 */
export const createProgrammaticRouter = ({
  routeMatcher,
  convertMatchToRoute,
  routeConfig,
  toUrl,
  rootPath,
  plainHash = false,
  queryString = emptyQueryString,
  wdw = window
}) => {
  if (!routeMatcher) {
    throw "routeMatcher is required";
  }

  if (!convertMatchToRoute) {
    throw "convertMatchToRoute is required";
  }

  if (!routeConfig && !toUrl) {
    throw "routeConfig or toUrl is required";
  }

  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : "#" + (plainHash ? "" : "!");

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || "/";
  const getStatePath = historyMode ? stripTrailingSlash : I;

  const toRoute = path => {
    const matchPath = getPathWithoutQuery(path) || "/";
    const match = routeMatcher(matchPath);
    const queryParams = queryString.parse(getQuery(path));

    return convertMatchToRoute({ match, queryParams });
  };

  const initialRoute = toRoute(getPath());

  const start = onRouteChange => {
    const routeChange = () => onRouteChange(toRoute(getPath()));
    routeChange();
    wdw.onpopstate = routeChange;
  };

  const toUrlFn = toUrl || ToUrl(routeConfig, getStatePath);
  toUrl = (page, params = {}, queryParams = {}) =>
    prefix + toUrlFn(page, params) + getQueryString(queryString, queryParams);

  const syncLocationBar = ({ page, params, queryParams, replace }) => {
    doSyncLocationBar({ replace, url: toUrl(page, params, queryParams), getUrl, wdw });
  };

  const getLinkHandler = createGetLinkHandler(wdw);

  return { initialRoute, toUrl, start, syncLocationBar, getLinkHandler };
};

/* getLinkHandler usage: with a getLinkAttrs function
export const getLinkAttrs = (router, page, params) => {
  const url = router.toUrl(page, params);

  return { href: url, onclick: router.getLinkHandler(url) };
};
*/

// ----- Mithril

/**
 * Configuration to create a Mithril router.
 *
 * @typedef {Object} MithrilRouterConfig
 *
 * @property {m} m the Mithril instance.
 * @property {RouteConfig} routeConfig the route configuration.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side routing support.
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
 * @param {*} params
 * @param {string} url
 *
 * @return {void}
 */

/**
 * Mithril `render` function.
 *
 * @callback MithrilRender
 *
 * @return {void}
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
 * @property {*} render
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
 * @typedef {*} m
 *
 * @property {MithrilDotRoute} route
 * @property {QueryStringStringify} buildQueryString
 */

const separateParamsAndQueryParams = (path, allParams) => {
  const pathParams = (path.match(/(:[^/]*)/g) || []).map(key => key.substring(1));

  return Object.entries(allParams).reduce(
    (result, [key, value]) => {
      const slot = pathParams.indexOf(key) >= 0 ? "params" : "queryParams";
      result[slot][key] = value;
      return result;
    },
    { params: {}, queryParams: {} }
  );
};

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
    throw "m is required";
  }

  if (!routeConfig) {
    throw "routeConfig is required";
  }

  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : "#" + (plainHash ? "" : "!");

  m.route.prefix = prefix;

  const queryString = { stringify: m.buildQueryString, parse: m.parseQueryString };
  const getUrl = createGetUrl(prefix, historyMode, wdw);

  const getStatePath = historyMode ? stripTrailingSlash : path => prefix + path;
  const toUrlFn = ToUrl(routeConfig, getStatePath);
  const toUrl = (page, params = {}, queryParams = {}) =>
    toUrlFn(page, params) + getQueryString(queryString, queryParams);

  const createMithrilRoutes = ({ onRouteChange, render }) =>
    Object.keys(routeConfig).reduce((result, path) => {
      const page = routeConfig[path];
      result[path] = {
        onmatch: params =>
          onRouteChange(Object.assign({ page }, separateParamsAndQueryParams(path, params))),
        render
      };
      return result;
    }, {});

  const addPrefix = historyMode ? url => prefix + url : I;

  const syncLocationBar = ({ page, params, queryParams, replace }) => {
    if (page) {
      doSyncLocationBar({ replace, url: addPrefix(toUrl(page, params, queryParams)), getUrl, wdw });
    }
  };

  return { createMithrilRoutes, toUrl, syncLocationBar };
};
