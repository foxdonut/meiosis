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
 * @param {*} [queryParams] the query parameters, if using query string support.
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
 * @callback LocationBarSync
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
 * @property {LocationBarSync} locationBarSync function that synchronizes the location bar with the
 * state route.
 * @property {Effect} effect effect function to synchronize the location bar with the state route.
 */

/**
 * Configuration to create a Mithril router.
 *
 * @typedef {Object} MithrilRouterConfig
 *
 * @property {m} m the Mithril instance.
 * @property {RouteConfig} routeConfig the route configuration.
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
 * @property {Route} initialRoute the initial route as parsed from the location bar.
 * @property {CreateMithrilRoutes} createMithrilRoutes creates Mithril routes suitable for passing
 * as the third argument to `m.route`.
 * @property {GetRoute} getRoute function to generate a route.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {LocationBarSync} locationBarSync function that synchronizes the location bar with the
 * state route.
 * @property {Effect} effect effect function to synchronize the location bar with the state route.
 */

const createGetUrl = (prefix, historyMode, wdw = window) =>
  historyMode
    ? () => wdw.decodeURI(wdw.location.pathname + wdw.location.search)
    : () => wdw.decodeURI(wdw.location.hash || prefix + "/");

const createGetPath = (prefix, getUrl) => () => getUrl().substring(prefix.length) || "/";

const createToUrl = (prefix, routeConfig, getQueryString) => (
  page,
  params = {},
  queryParams = {}
) => {
  const pathTemplateLookup = Object.keys(routeConfig).reduce(
    (result, path) => Object.assign(result, { [routeConfig[path]]: path }),
    {}
  );

  // FIXME. Need to have a better separation of hardcoded paths vs toUrl approach.
  // Also, who's to say routes map to plain string page IDs?
  const url = prefix + (page.startsWith("/") ? page : pathTemplateLookup[page]);

  return (
    (url.match(/(:[^/]*)/g) || []).reduce(
      (result, pathParam) =>
        result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
      url
    ) + getQueryString(queryParams)
  );
};

const createGetRoute = (prefix, toUrl, matcher) => (page, params = {}, queryParams = {}) =>
  page.startsWith("/")
    ? matcher(page)
    : {
        page,
        params,
        url: prefix + toUrl(page, params, queryParams)
      };

const createLocationBarSync = (getUrl, wdw = window) => route => {
  if (route.url !== getUrl()) {
    wdw.history.pushState({}, "", route.url);
  }
};

const createEffect = (locationBarSync, routeProp) => state => {
  locationBarSync(state[routeProp]);
};

const emptyQueryString = {
  parse: _ => ({}),
  stringify: _ => ""
};

/**
 * Creates a router.
 */
export const createRouter = ({
  routeMatcher,
  matchToRoute,
  plainHash = false,
  historyMode = false,
  queryString = emptyQueryString,
  wdw = window
}) => {
  const pathname = wdw.location.pathname;
  const prefix = historyMode
    ? pathname.endsWith("/")
      ? pathname.substring(0, pathname.length - 1)
      : pathname
    : "#" + (plainHash ? "" : "!");
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = createGetPath(prefix, getUrl);

  const toRoute = path => {
    const match = routeMatcher(getPathWithoutQuery(path));
    const queryParams = queryString.parse(getQuery(path));
    const url = prefix + path;
    return Object.assign(matchToRoute(Object.assign(match, { queryParams })), { url });
  };

  const initialRoute = toRoute(getPath());

  const start = onRouteChange => {
    wdw.onpopstate = () => onRouteChange(toRoute(getPath()));
  };

  const syncLocationBar = route => {
    const url = route.url;
    if (url !== getUrl()) {
      wdw.history.pushState({}, "", url);
    }
  };

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    wdw.history.pushState({}, "", url);
    wdw.onpopstate(null);
  };

  return { initialRoute, toRoute, start, syncLocationBar, getLinkHandler };
};

/**
 * Creates a router.
 */
export const _createRouter = ({
  // routeConfig,
  routeMatcher,
  matchToRoute,
  fromRoute,
  toRoute,
  toUrl,
  plainHash = false,
  historyMode = false,
  queryString = emptyQueryString,
  wdw = window
}) => {
  const pathname = wdw.location.pathname;
  const prefix = historyMode
    ? pathname.endsWith("/")
      ? pathname.substring(0, pathname.length - 1)
      : pathname
    : "#" + (plainHash ? "" : "!");
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getUrl = createGetUrl(prefix, historyMode, wdw);
  const getPath = createGetPath(prefix, getUrl);
  /*
  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };
  const toUrl = createToUrl(prefix, routeConfig, getQueryString);
  */

  const matcher = path => {
    const match = routeMatcher(getPathWithoutQuery(path));
    const queryParams = queryString.parse(getQuery(path));
    return matchToRoute(match, queryParams);
  };

  /* instead of getRoute:
   * - toRoute(page, params, queryParams), or
   * - matcher(path) <-- if we're not using page IDs for routes, we don't need toUrl
   * and we should store the url in the state.
   */
  const getRoute = (page, params = {}, queryParams = {}) =>
    page.startsWith("/") ? matcher(page) : toRoute(page, params, queryParams);

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    wdw.history.pushState({}, "", url);
    wdw.onpopstate(null);
  };

  const initialRoute = matcher(getPath());

  const start = onRouteChange => {
    wdw.onpopstate = () => onRouteChange(matcher(getPath()));
  };

  const syncLocationBar = route => {
    const { page, params, queryParams } = fromRoute(route);
    const url = toUrl(page, params, queryParams);
    if (url !== getUrl()) {
      wdw.history.pushState({}, "", url);
    }
  };

  return { initialRoute, getRoute, getLinkHandler, toUrl, start, syncLocationBar };
};

/**
 * Sets up a router using
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher).
 *
 * @param {FeatherRouterConfig} config
 *
 * @return {FeatherRouter}
 */
export const createFeatherRouter = ({
  createRouteMatcher,
  routeConfig,
  queryString = emptyQueryString,
  plainHash = false,
  historyMode = false,
  routeProp = "route",
  wdw = window
}) => {
  const pathname = wdw.location.pathname;
  const prefix = historyMode
    ? pathname.endsWith("/")
      ? pathname.substring(0, pathname.length - 1)
      : pathname
    : "#" + (plainHash ? "" : "!");
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const getUrl = createGetUrl(prefix, historyMode);
  const getPath = createGetPath(prefix, getUrl);
  const toUrl = createToUrl(prefix, routeConfig, getQueryString);
  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));
    const queryParams = queryString.parse(getQuery(path));
    const url = prefix + match.url + getQueryString(queryParams);
    return Object.assign(match, { params: match.params, queryParams, url });
  };

  const getRoute = createGetRoute("", toUrl, routeMatcher);

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    wdw.history.pushState({}, "", url);
    wdw.onpopstate(null);
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    wdw.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const locationBarSync = createLocationBarSync(getUrl);
  const effect = createEffect(locationBarSync, routeProp);

  return { initialRoute, getRoute, getLinkHandler, toUrl, start, locationBarSync, effect };
};

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
  routeConfig,
  plainHash = false,
  historyMode = false,
  routeProp = "route",
  wdw = window
}) => {
  const pathname = wdw.location.pathname;
  const prefix = historyMode
    ? pathname.endsWith("/")
      ? pathname.substring(0, pathname.length - 1)
      : pathname
    : "#" + (plainHash ? "" : "!");

  m.route.prefix = prefix;

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const getUrl = createGetUrl(prefix, historyMode);
  const toUrl = createToUrl(historyMode ? "" : prefix, routeConfig, getQueryString);
  const getRoute = createGetRoute(historyMode ? prefix : "", toUrl);

  const createMithrilRoutes = ({ onRouteChange, App, states, update, actions }) =>
    Object.keys(routeConfig).reduce((result, path) => {
      const page = routeConfig[path];
      result[path] = {
        onmatch: (params, url) => onRouteChange({ page, params, url: prefix + url }),
        render: () => m(App, { state: states(), update, actions })
      };
      return result;
    }, {});

  // FIXME
  const initialRoute = { url: getUrl(), page: "", params: {}, queryParams: {} };
  const locationBarSync = createLocationBarSync(getUrl);
  const effect = createEffect(locationBarSync, routeProp);

  return { createMithrilRoutes, initialRoute, getRoute, toUrl, locationBarSync, effect };
};
