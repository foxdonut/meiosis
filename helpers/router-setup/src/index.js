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
 * @property {*} params an object with the path parameters, and query string parameters under
 * the `queryParams` property.
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
 * @param {*} [params] if using a page ID, the parameters. If using query string support, use
 * the `queryParams` property inside the params object for query string parameters.
 * @return {Route} the route.
 */

/**
 * Function to generate a URL from a page ID and params.
 *
 * @callback ToUrl
 *
 * @param {string} page the page ID.
 * @param {*} [params] the parameters. If using query string support, use the `queryParams`
 * property inside the params object for query string parameters.
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
 * Configuration to create a Feather router.
 *
 * @typedef {Object} FeatherRouterConfig
 *
 * @property {CreateRouteMatcher} createRouteMatcher the feather route matcher function.
 * @property {RouteConfig} routeConfig the route configuration.
 * @property {QueryStringLib} [queryString] the query string library to use. You only need to
 * provide this if your application requires query string support.
 * @property {boolean} [historyMode=false] if `true`, uses history mode instead of hash mode. If you
 * are using history mode, you need to provide server side routing support. By default,
 * `historyMode` is `false`.
 * @property {string} [routeProp="route"] this is the property in your state where the route is
 * stored. Defaults to `"route"`.
 *
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
 * @property {string} [prefix="#"] hash prefix. Defaults to `"#"`.
 * @property {string} [routeProp="route"] this is the property in your state where the route is
 * stored. Defaults to `"route"`.
 *
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
 * @param {OnRouteChange} onRouteChange
 * @param {*} App
 * @param {*} states
 * @param {*} update
 * @param {*} actions
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
 * @property {GetRoute} getRoute function to generate a route.
 * @property {ToUrl} toUrl function to generate a URL.
 * @property {LocationBarSync} locationBarSync function that synchronizes the location bar with the
 * state route.
 * @property {Effect} effect effect function to synchronize the location bar with the state route.
 */

const createGetUrl = (prefix, historyMode) =>
  historyMode
    ? () => decodeURI(window.location.pathname + window.location.search)
    : () => decodeURI(window.location.hash || prefix + "/");

const createGetPath = (prefix, getUrl) => getUrl().substring(prefix.length) || "/";

const getPathTemplateLookup = routeConfig =>
  Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

const createToUrl = (prefix, pathTemplateLookup, getQueryString) => (pageId, params = {}) => {
  const url = prefix + pathTemplateLookup[pageId];

  return (
    (url.match(/(:[^/]*)/g) || []).reduce(
      (result, pathParam) =>
        result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
      url
    ) + getQueryString(params.queryParams)
  );
};

const createGetRoute = (prefix, toUrl, matcher) => (page, params = {}) =>
  page.startsWith("/")
    ? matcher(page)
    : {
        page,
        params,
        url: toUrl(page, params).substring(prefix.length)
      };

const createLocationBarSync = getUrl => route => {
  if (route.url !== getUrl()) {
    window.history.pushState({}, "", route.url);
  }
};

const createEffect = (locationBarSync, routeProp) => state => {
  locationBarSync(state[routeProp]);
};

const emptyQueryString = {
  parse: () => {},
  stringify: () => ""
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
  historyMode = false,
  routeProp = "route"
}) => {
  const prefix = historyMode ? window.location.pathname : "#";
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathTemplateLookup = getPathTemplateLookup(routeConfig);
  const getUrl = createGetUrl(prefix, historyMode);
  const getPath = createGetPath(prefix, getUrl);
  const toUrl = createToUrl(prefix, pathTemplateLookup, getQueryString);
  const matcher = createRouteMatcher(routeConfig);
  const getRoute = createGetRoute(prefix, toUrl, matcher);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    const url = prefix + match.url + getQueryString(params.queryParams);
    return Object.assign(match, { params, url });
  };

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    window.history.pushState({}, "", url);
    window.onpopstate();
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
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
export const createMithrilRouter = ({ m, routeConfig, prefix = "#", routeProp = "route" }) => {
  m.route.prefix = prefix;

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathTemplateLookup = getPathTemplateLookup(routeConfig);
  const getUrl = createGetUrl(prefix, false);
  const toUrl = createToUrl(prefix, pathTemplateLookup, getQueryString);
  const getRoute = createGetRoute(prefix, toUrl);

  const createMithrilRoutes = ({ onRouteChange, App, states, update, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, url) => onRouteChange({ page, params, url }),
        render: () => m(App, { state: states(), update, actions })
      };
      return result;
    }, {});

  const locationBarSync = createLocationBarSync(getUrl);
  const effect = createEffect(locationBarSync, routeProp);

  return { createMithrilRoutes, getRoute, toUrl, locationBarSync, effect };
};
