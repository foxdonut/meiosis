// @ts-check

// ----- Type definitions

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
 * Route and query string params.
 *
 * @typedef {Object.<string, any>} Params
 */

/**
 * A route in the application state.
 *
 * @typedef {Object} Route
 *
 * @property {string} page the page corresponding to the route.
 * @property {Params} params and object with route and query string params.
 * @property {boolean} changed indicates that the route changed.
 * @property {boolean} [replace] indicates whether to replace the entry in the browser's history.
 */

/**
 * A route matcher resolves a URL to a route.
 *
 * @template M
 * @callback RouteMatcher
 *
 * @param {string} url the URL to resolve.
 *
 * @return {M} the matched route.
 */

/**
 * A function to convert the match from the router library to an object with `page` and `params`.
 *
 * @template M
 * @callback ConvertMatch
 *
 * @param {M} match the route match returned by the router library
 *
 * @return {{page: string, params: Params}} the converted object.
 */

/**
 * Query string parse function.
 *
 * @callback QueryStringParse
 *
 * @param {string} query the query string to parse.
 *
 * @return {Params} the result of parsing the query string.
 */

/**
 * Query string stringify function.
 *
 * @callback QueryStringStringify
 *
 * @param {Params} query the query string object.
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
 * Function to convert a page and params to a route.
 *
 * @callback ToRoute
 *
 * @param {string} page the page ID.
 * @param {Params} [params] the path parameters.
 *
 * @return {Route} the route.
 */

/**
 * Function to generate a URL from a page ID and params.
 *
 * @callback ToUrl
 *
 * @param {string} page the page ID.
 * @param {Params} [params] the path parameters.
 *
 * @return {string} the URL.
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
 * @return {any}
 */

/**
 * Function to start the router.
 *
 * @callback Start
 *
 * @param {OnRouteChange} onRouteChange callback function for when the route changes.
 *
 * @return {any}
 */

/**
 * @typedef {Object} SyncLocationBarParams
 *
 * @property {string} page
 * @property {Params} [params]
 * @property {boolean} [replace]
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
 * @param {any} state the state object
 * @param {string} title the document title - most browsers ignore this parameter
 * @param {string} url the new history entry's URL
 *
 * @return {void}
 */

/**
 * Built-in callback function when the location changes.
 *
 * @callback Onpopstate
 *
 * @param {any} event the event.
 *
 * @return {void}
 */

/**
 * Built-in `location` object, defined for testing purposes.
 *
 * @typedef {Object} Location
 *
 * @property {string} hash
 * @property {string} origin
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
 * Built-in callback function to add an event listener.
 *
 * @callback AddEventListener
 *
 * @param {string} type
 * @param {any} listener
 * @param {any} options
 */

/**
 * Built-in callback function to remove an event listener.
 *
 * @callback RemoveEventListener
 *
 * @param {string} type
 * @param {any} listener
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
 * @property {AddEventListener} addEventListener function to add an event listener.
 * @property {RemoveEventListener} removeEventListener function to remove an event listener.
 */

/**
 * Configuration to create a router.
 *
 * @template M
 * @typedef {Object} RouterConfig
 *
 * @property {RouteMatcher<M>} routeMatcher the function that matches routes.
 * @property {ConvertMatch<M>} convertMatch a function to convert a router library match to a
 * route.
 * @property {RouteConfig} [routeConfig] the route configuration. If not provided, `toUrl` must
 * be provided.
 * @property {ToUrl} [toUrl] the `toUrl` function. If not provided, `routeConfig` must be
 * provided and `toUrl` is constructed from `routeConfig`.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you are
 * using history mode, you need to provide server side routing support. If not provided, defaults to
 * the identity function.
 * @property {boolean} [plainHash=false] whether to use a plain hash, `"#"`, instead of a hash-bang,
 * `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
 * if `rootPath` is specified.
 * @property {QueryStringLib} [queryString] the query string library to use. You only need to
 * provide this if your application requires query string support.
 * @property {Window} [wdw=window] the `window`, used for testing purposes.
 */

/**
 * This is the router that is created by {@link createRouter}.
 *
 * @typedef {Object} Router
 *
 * @property {Route} initialRoute the initial route as parsed from the location bar.
 * @property {ToRoute} toRoute function to convert a page and params to a route.
 * @property {ToRoute} replaceRoute function to convert a page and params to a route that will
 * replace the current route in the browser history.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {Start} start function to start the router.
 * @property {SyncLocationBar} syncLocationBar function that synchronizes the location bar with the
 * state route.
 */

// ----- Helpers

const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);
const I = x => x;

const getQuery = path => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

export const getQueryString = (queryString, queryParams = {}) => {
  const query = queryString.stringify(queryParams);
  return (query.length > 0 ? "?" : "") + query;
};

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

const getConfig = (rootPath, plainHash) => {
  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : "#" + (plainHash ? "" : "!");

  return { prefix, historyMode };
};

const toRoute = (page, params = {}) => ({ page, params, changed: true });
const replaceRoute = (page, params = {}) => ({ page, params, changed: true, replace: true });

const createGetUrl = (prefix, historyMode, wdw) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + "/");

/**
 * Helper that creates a `toUrl` function.
 *
 * @param {RouteConfig} routeConfig
 * @param {function(string):string} getStatePath
 * @param {QueryStringLib} queryString
 *
 * @return {ToUrl}
 */
const ToUrl = (routeConfig, getStatePath, queryString) => {
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

const createToUrl = (routeConfig, prefix, queryString, historyMode, toUrl) => {
  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrlFn = toUrl || ToUrl(routeConfig, getStatePath, queryString);
  return (page, params = {}) => prefix + toUrlFn(page, params);
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
 * Helper to intercept link clicks in history mode.
 *
 * @param {Window} wdw
 * @param {string} prefix
 * @param {function(string):void} setHref
 */
const addEventListener = (wdw, prefix, setHref) => {
  const origin = wdw.location.origin;

  const linkHandler = evt => {
    let element = evt.target;
    while (element && element.nodeName.toLowerCase() !== "a") {
      element = element.parentNode;
    }
    if (
      element &&
      element.nodeName.toLowerCase() === "a" &&
      element.href.startsWith(origin) &&
      element.href.indexOf(prefix) >= 0
    ) {
      evt.preventDefault();
      setHref(element.href);
    }
  };

  wdw.addEventListener("click", linkHandler, false);

  wdw.addEventListener("beforeunload", () => {
    wdw.removeEventListener("click", linkHandler);
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
    throw "routeMatcher is required";
  }

  if (!convertMatch) {
    throw "convertMatch is required";
  }

  if (!routeConfig && !toUrl) {
    throw "routeConfig or toUrl is required";
  }

  const { prefix, historyMode } = getConfig(rootPath, plainHash);

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || "/";
  toUrl = createToUrl(routeConfig, prefix, queryString, historyMode, toUrl);

  const getRoute = path => {
    let matchPath = path || "/";
    if (matchPath.startsWith("?")) {
      matchPath = "/" + matchPath;
    }
    const match = routeMatcher(matchPath);
    const converted = convertMatch(match);
    const queryParams = queryString.parse(getQuery(path));
    const params = Object.assign(queryParams, converted.params);

    return Object.assign(converted, { params, changed: true });
  };

  const initialRoute = getRoute(getPath());

  const start = onRouteChange => {
    if (historyMode) {
      addEventListener(wdw, prefix, href => {
        wdw.history.pushState({}, "", href);
        wdw.onpopstate();
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
  isRouteChanged = state => state.route.changed,
  routeChangedPatch = { route: { changed: false } }
}) => {
  const routeChangeUpdate = patch => update([patch, routeChangedPatch]);
  const effects = Effects.map(Effect => Effect(routeChangeUpdate));

  return state => {
    if (isRouteChanged(state)) {
      effects.forEach(effect => effect(state));
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
    throw "m is required";
  }

  if (!routeConfig) {
    throw "routeConfig is required";
  }

  const { prefix, historyMode } = getConfig(rootPath, plainHash);

  m.route.prefix = prefix;

  const queryString = { stringify: m.buildQueryString, parse: m.parseQueryString };
  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const toUrl = createToUrl(routeConfig, prefix, queryString, historyMode);

  const createMithrilRoutes = ({ onRouteChange, render }) => {
    if (historyMode) {
      const prefixLength = prefix.length;
      addEventListener(wdw, prefix, href => {
        m.route.set(href.substring(href.indexOf(prefix) + prefixLength));
      });
    }

    return Object.keys(routeConfig).reduce((result, path) => {
      const page = routeConfig[path];
      result[path] = {
        onmatch: params => onRouteChange({ page, params, changed: true }),
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
