/**
 * Route configuration. This is a plain object where the properties are the route path templates and
 * the values are string page IDs. Route path templates may contain parameters by using `:` as a
 * prefix. For example:
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
 * @property {String} page - the page ID.
 * @property {Object} params - an object with the path parameters, and query string parameters under
 * the `queryParams` property.
 * @property {String} url - the URL of the route.
 */

/**
 * A route matcher is created by the {@link CreateRouteMatcher} function from a {@link RouteConfig}.
 *
 * @typedef {Function} RouteMatcher
 * @param {String} url - the URL to resolve.
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
 * @typedef {Function} CreateRouteMatcher
 * @param {RouteConfig} routeConfig - the route configuration.
 * @return {RouteMatcher} the created route matcher.
 */

/**
 * Query string parse function.
 *
 * @typedef {Function} QueryStringParse
 * @param {String} query - the query string to parse.
 * @return {Object} the result of parsing the query string.
 */

/**
 * Query string stringify function.
 *
 * @typedef {Function} QueryStringStringify
 * @param {Object} query - the query string object.
 * @return {String} the stringified query string.
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
 * @typedef {Function} GetRoute
 *
 * @param {String} page - the page ID, or the URL.
 * @param {Object?} params - if using a page ID, the parameters. If using query string support, use
 * the `queryParams` property inside the params object for query string parameters.
 * @return {Route} the route.
 */

/**
 * Function to generate a URL from a page ID and params.
 *
 * @typedef {Function} ToUrl
 *
 * @param {String} page - the page ID.
 * @param {Object?} params - the parameters. If using query string support, use the `queryParams`
 * property inside the params object for query string parameters.
 * @return {String} the URL.
 */

/**
 * Function to generate an event handler for a link.
 *
 * @typedef {Function} GetLinkHandler
 */

/**
 * Callback function for when the route changes. Typically, this function updates the application
 * state with the route, for example:
 *
 * ```javascript
 * router.start({ onRouteChange: route => update({ route: () => route }) });
 * ```
 *
 * @typedef {Function} OnRouteChange
 *
 * @param {Route} route
 * @return {void}
 */

/**
 * Function to start the router.
 *
 * @typedef {Function} Start
 *
 * @param {OnRouteChange} onRouteChange - callback function for when the route changes.
 *
 * @return {void}
 */

/**
 * Function to synchronize the location bar with the state route.
 *
 * @typedef {Function} LocationBarSync
 */

/**
 * Effect function to synchronize the location bar with the state route.
 *
 * @typedef {Function} Effect
 */

/**
 * This is the router that is created by {@link MeiosisRouter.createFeatherRouter}.
 *
 * @typedef {Object} FeatherRouter
 *
 * @property {Route} initialRoute - the initial route as parsed from the location bar.
 * @property {GetRoute} getRoute - function to generate a route.
 * @property {ToUrl} toUrl - function to generate a URL.
 * @property {GetLinkHandler} getLinkHandler - when using history mode, ...
 * @property {Start} start - function to start the router.
 * @property {LocationBarSync} locationBarSync - x
 * @property {Effect} effect - x
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
 * @typedef {Function} CreateMithrilRoutes
 *
 * @param {OnRouteChange} onRouteChange
 * @param {Object} App
 * @param {Stream} states
 * @param {Stream} update
 * @param {Object} actions
 *
 * @return Mithril routes.
 */

/**
 *
 * @typedef {Object} MithrilRouter
 *
 * @property {CreateMithrilRoutes} createMithrilRoutes - x
 * @property {GetRoute} getRoute - x
 * @property {ToUrl} toUrl - x
 * @property {LocationBarSync} locationBarSync - x
 * @property {Effect} effect - x
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
 * @function MeiosisRouter.createFeatherRouter
 *
 * @param {CreateRouteMatcher} createRouteMatcher - the feather route matcher function.
 * @param {RouteConfig} routeConfig - the route configuration.
 * @param {QueryStringLib?} queryString - the query string library to use. You only need to provide
 * this if your application requires query string support.
 * @param {boolean?} historyMode - if `true`, uses history mode instead of hash mode. If you are
 * using history mode, you need to provide server side routing support. By default, `historyMode`
 * is `false`.
 * @param {String?} routeProp - this is the property in your state where the route is stored.
 * Defaults to `"route"`.
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

  const start = ({ onRouteChange }) => {
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
 * @function MeiosisRouter.createMithrilRouter
 *
 * @param {m} Mithril - the Mithril instance.
 * @param {RouteConfig} routeConfig - the route configuration.
 * @param {String?} prefix - hash prefix. Defaults to `"#"`.
 * @param {String?} routeProp - this is the property in your state where the route is stored.
 * Defaults to `"route"`.
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
