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
 * @property {string} page - the page ID.
 * @property {Object} params - an object with the path parameters, and query string parameters under
 * the `queryParams` property.
 * @property {string} url - the URL of the route.
 */

/**
 * A route matcher is created by the {@link CreateRouteMatcher} function from a {@link RouteConfig}.
 *
 * @typedef {Function<String, Route>} RouteMatcher
 */

/**
 * This is the default function exported by
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher):
 *
 * ```javascript
 * import createRouteMatcher from "feather-route-matcher";
 * ```
 *
 * @typedef {Function<RouteConfig, RouteMatcher>} CreateRouteMatcher
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
 * @typedef {{parse: Function<string, Object>, stringify: Function<Object, string>}} QueryStringLib
 */

/**
 * This is the router that is created by {@link MeiosisRouter.createFeatherRouter}.
 *
 * @typedef {Object} FeatherRouter
 *
 * @property {Route} initialRoute - x
 * @property {Function} routeMatcher - x
 * @property {Function} getRoute - x
 * @property {Function} toUrl - x
 * @property {Function} getLinkHandler - when using history mode, ...
 * @property {Function} start - x
 * @property {Function} locationBarSync - x
 * @property {Function} effect - x
 */

/**
 *
 * @typedef {Object} MithrilRouter
 *
 * @property {Function} createMithrilRoutes - x
 * @property {Function} getRoute - x
 * @property {Function} toUrl - x
 * @property {Function} locationBarSync - x
 * @property {Function} effect - x
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

const createGetRoute = (prefix, toUrl) => (page, params = {}) => ({
  page,
  params,
  url: toUrl(page, params).substring(prefix.length)
});

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
 * @param {string?} routeProp - this is the property in your state where the route is stored.
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
  const getRoute = createGetRoute(prefix, toUrl);
  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    const url = prefix + match.url + getQueryString(params.queryParams);
    return Object.assign(match, { params, url });
  };

  const getHref = (pageId, params = {}) => {
    const url = pageId.startsWith("/") ? prefix + pageId : toUrl(pageId, params);

    return {
      href: url,
      onclick: evt => {
        evt.preventDefault();
        window.history.pushState({}, "", url);
        window.onpopstate();
      }
    };
  };

  const initialRoute = routeMatcher(getPath());

  const start = ({ onRouteChange }) => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const locationBarSync = createLocationBarSync(getUrl);
  const effect = createEffect(locationBarSync, routeProp);

  return { initialRoute, routeMatcher, getRoute, getHref, toUrl, start, locationBarSync, effect };
};

/**
 * Sets up a router using
 * [Mithril Router](https://mithril.js.org/route.html).
 *
 * @function MeiosisRouter.createMithrilRouter
 *
 * @param {m} Mithril - the Mithril instance.
 * @param {RouteConfig} routeConfig - the route configuration.
 * @param {string?} prefix - hash prefix. Defaults to `"#"`.
 * @param {string?} routeProp - this is the property in your state where the route is stored.
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

  const createMithrilRoutes = ({ App, onRouteChange, states, update, actions }) =>
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
