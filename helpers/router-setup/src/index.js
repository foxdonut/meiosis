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
 * @property {string} page the page ID.
 * @property {*} params an object with the path parameters.
 * @property {*} queryParams an object with the query string parameters.
 * @property {string} url the URL of the route.
 */

/**
 * A route matcher is created by the {@link CreateRouteMatcher} function from a {@link RouteConfig}
 * and resolves a URL to a route.
 *
 * @callback RouteMatcher
 * @param {string} url the URL to resolve.
 * @return {Route} the resolved route.
 */

/**
 * This is the default function exported by
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher):
 *
 * ```javascript
 * import createRouteMatcher from "feather-route-matcher";
 * ```
 *
 * @callback CreateRouteMatcher
 * @param {RouteConfig} routeConfig the route configuration.
 * @return {RouteMatcher} the created route matcher.
 */

/**
 * Query string parse function.
 *
 * @callback QueryStringParse
 * @param {string} query the query string to parse.
 * @return {Object.<string,any>} the result of parsing the query string.
 */

/**
 * Query string stringify function.
 *
 * @callback QueryStringStringify
 * @param {Object.<string,any>} query the query string object.
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
 * Function to generate a {@link Route} from a URL, or from a page ID and params.
 *
 * @callback GetRoute
 *
 * @param {string} page the page ID, or the URL.
 * @param {*} [params] if using a page ID, the parameters.
 * @param {*} [queryParams] if using query string support, the query string parameters.
 * @return {Route} the route.
 */

/**
 * Function to generate a URL from a page ID and params.
 *
 * @callback ToUrl
 *
 * @param {string} page the page ID.
 * @param {*} [params] the path parameters.
 * @return {string} the URL.
 */

/**
 * Link handler function which calls `preventDefault` on the link event and emits the URL.
 *
 * @callback LinkHandler
 *
 * @param {Event} event
 * @return {void}
 */

/**
 * Function to generate an event handler for a link.
 *
 * @callback GetLinkHandler
 *
 * @param {string} url the URL of the link.
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
 * @return {void}
 */

/**
 * Function to start the router.
 *
 * @callback Start
 *
 * @param {OnRouteChange} onRouteChange callback function for when the route changes.
 * @return {void}
 */

/**
 * Function that synchronizes the location bar with the state route.
 *
 * @callback SyncLocationBar
 *
 * @param {Route} route the route from the application state.
 * @return {void}
 */

/**
 * Effect function to synchronize the location bar with the state route.
 *
 * @callback Effect
 *
 * @param {*} state the application state.
 * @return {void}
 */

/**
 * Built-in function to decode a URI.
 *
 * @callback DecodeURI
 * @param {string} uri the URI.
 * @return {string} the decoded URI.
 */

/**
 * Built-in function to change the location.
 *
 * @callback PushState
 * @param {*} somethingFIXME
 * @param {string} somethingElseFIXME
 * @param {string} uri
 * @return {void}
 */

/**
 * Built-in callback function when the location changes.
 *
 * @callback Onpopstate
 * @param {*} event the event.
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
 * Configuration to create a Feather router.
 *
 * @typedef {Object} FeatherRouterConfig
 *
 * @property {CreateRouteMatcher} createRouteMatcher the feather route matcher function.
 * @property {RouteConfig} routeConfig the route configuration.
 * @property {QueryStringLib} [queryString] the query string library to use. You only need to
 * provide this if your application requires query string support.
 * @property {boolean} [plainHash=false] whether to use a plain hash, `"#"`, instead of a hash-bang,
 * `"#!"`. Defaults to `false`. The `plainHash` option should not be specified (it will be ignored)
 * if `historyMode` is `true`.
 * @property {boolean} [historyMode=false] if `true`, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side routing support. By default,
 * `historyMode` is `false`.
 * @property {string} [routeProp="route"] this is the property in your state where the route is
 * stored. Defaults to `"route"`.
 * @property {Window} [wdw=window] the `window`, used for testing purposes.
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

/**
 * This is the router that is created by {@link createFeatherRouter}.
 *
 * @typedef {Object} FeatherRouter
 *
 * @property {Route} initialRoute the initial route as parsed from the location bar.
 * @property {GetRoute} getRoute function to generate a route.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {GetLinkHandler} getLinkHandler when using history mode, ...
 * @property {Start} start function to start the router.
 * @property {SyncLocationBar} locationBarSync function that synchronizes the location bar with the
 * state route.
 * @property {Effect} effect effect function to synchronize the location bar with the state route.
 */

/**
 * Configuration to create a Mithril router.
 *
 * @typedef {Object} MithrilRouterConfig
 *
 * @property {m} m the Mithril instance.
 * @property {string} [rootPath] if specified, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side routing support.
 * @property {RouteConfig} routeConfig the route configuration.
 * @property {*} fromRoute
 * @property {*} toRoute
 * @property {*} matchToRoute
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
 * @property {*} App
 * @property {*} states
 * @property {*} update
 * @property {*} actions
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

const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);
const I = x => x;

const getPathWithoutQuery = path => path.replace(/\?.*/, "");

const getQuery = path => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

const getQueryString = (queryString, queryParams = {}) => {
  const query = queryString.stringify(queryParams);
  return (query.length > 0 ? "?" : "") + query;
};

const createGetUrl = (prefix, historyMode, wdw) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + "/");

const emptyQueryString = {
  parse: _ => ({}),
  stringify: _ => ""
};

const doSyncLocationBar = ({ route, url, getUrl, wdw }) => {
  if (url !== getUrl()) {
    const fn = route.replace ? "replaceState" : "pushState";
    wdw.history[fn].call(wdw.history, {}, "", url);
  }
};

const createApi = ({ api, historyMode, isProgrammaticUrl, toRoute, wdw }) => {
  if (historyMode) {
    api.getLinkHandler = url => evt => {
      evt.preventDefault();
      wdw.history.pushState({}, "", url);
      wdw.onpopstate(null);
    };
  }

  if (!isProgrammaticUrl) {
    api.toRoute = toRoute;
  }

  return api;
};

export const ToUrl = (routeConfig, queryString) => {
  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  return (page, params = {}) => {
    const path = pathLookup[page];
    const pathParams = [];

    const result = (path.match(/(:[^/]*)/g) || []).reduce((result, pathParam) => {
      pathParams.push(pathParam.substring(1));
      return result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)]));
    }, path);

    const queryParams = Object.entries(params).reduce((result, [key, value]) => {
      if (pathParams.indexOf(key) < 0) {
        result[key] = value;
      }
      return result;
    }, {});

    return result + getQueryString(queryString, queryParams);
  };
};

/**
 * Creates a router.
 */
export const createRouter = ({
  routeMatcher,
  rootPath,
  routeConfig,
  toUrl,
  fromRoute,
  matchToRoute = I,
  plainHash = false,
  queryString = emptyQueryString,
  wdw = window
}) => {
  const isProgrammaticUrl = routeConfig != null || toUrl != null;

  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : "#" + (plainHash ? "" : "!");

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = () => getUrl().substring(prefix.length) || "/";
  const getStatePath = historyMode ? stripTrailingSlash : I;
  const toUrlFn = isProgrammaticUrl
    ? routeConfig != null
      ? ToUrl(routeConfig, queryString)
      : toUrl
    : null;

  const toRoute = (path, options) => {
    const matchPath = getPathWithoutQuery(path) || "/";
    const match = routeMatcher(matchPath);
    const queryParams = queryString.parse(getQuery(path));

    const statePath = getStatePath(matchPath);
    const url = prefix + statePath + getQueryString(queryString, queryParams);

    return Object.assign(
      matchToRoute(Object.assign(match, { params: Object.assign({}, match.params, queryParams) })),
      { url },
      options
    );
  };

  const routerToUrl = isProgrammaticUrl
    ? (page, params = {}) => getStatePath(prefix + toUrlFn(page, params))
    : path => prefix + path;

  const initialRoute = toRoute(getPath());

  const start = onRouteChange => {
    wdw.onpopstate = () => onRouteChange(toRoute(getPath()));
  };

  const syncLocationBar = isProgrammaticUrl
    ? route => {
        const { page, params } = fromRoute(route);
        doSyncLocationBar({ route, url: routerToUrl(page, params), getUrl, wdw });
      }
    : route => doSyncLocationBar({ route, url: route.url, getUrl, wdw });

  return createApi({
    api: { initialRoute, toUrl: routerToUrl, start, syncLocationBar },
    historyMode,
    isProgrammaticUrl,
    toRoute,
    wdw
  });
};

/* getLinkHandler usage: in a Link component
export const Link = {
  view: ({ attrs, children }) => {
    const url = router.toUrl(attrs.href);

    return m("a", { ...attrs, href: url, onclick: router.getLinkHandler(url) }, children);
  }
};
*/

/**
 * Sets up a router using
 * [Mithril Router](https://mithril.js.org/route.html).
 *
 * @param {MithrilRouterConfig} config
 *
 * @return {MithrilRouter}
 */
export const createMithrilRouter = ({
  m,
  rootPath,
  routeConfig,
  fromRoute,
  toRoute,
  plainHash = false,
  wdw = window
}) => {
  const historyMode = rootPath != null;
  const prefix = historyMode ? rootPath : "#" + (plainHash ? "" : "!");

  m.route.prefix = prefix;

  const queryString = { stringify: m.buildQueryString };
  const getUrl = createGetUrl(prefix, historyMode, wdw);

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const getStatePath = historyMode ? stripTrailingSlash : path => prefix + path;

  const toUrl = (id, params = {}) => {
    const path = getStatePath(pathLookup[id]);
    const pathParams = [];

    const result = (path.match(/(:[^/]*)/g) || []).reduce((result, pathParam) => {
      pathParams.push(pathParam.substring(1));
      return result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)]));
    }, path);

    const queryParams = Object.entries(params).reduce((result, [key, value]) => {
      if (pathParams.indexOf(key) < 0) {
        result[key] = value;
      }
      return result;
    }, {});

    return result + getQueryString(queryString, queryParams);
  };

  const createMithrilRoutes = ({ onRouteChange, App, states, update, actions }) =>
    Object.keys(routeConfig).reduce((result, path) => {
      const page = routeConfig[path];
      result[path] = {
        onmatch: params => onRouteChange(toRoute(page, params)),
        render: () => m(App, { state: states(), update, actions })
      };
      return result;
    }, {});

  const addPrefix = historyMode ? url => prefix + url : I;

  const syncLocationBar = route => {
    const { page, params } = fromRoute(route);
    if (page) {
      doSyncLocationBar({ route, url: addPrefix(toUrl(page, params)), getUrl, wdw });
    }
  };

  return { createMithrilRoutes, toUrl, syncLocationBar };
};
