/**
 * Route configuration. This is a plain object where the properties are the route paths and the
 * values are strings that identify the route. Route paths may contain parameters by using `:`
 * as a prefix. For example:
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
 * @typedef {Object} route
 *
 * @property {string} page
 * @property {Object} params
 */

/**
 * This is the default function exported by
 * [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher):
 *
 * ```javascript
 * import createRouteMatcher from "feather-route-matcher";
 * ```
 *
 * @typedef {Function} createRouteMatcher
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
 * @typedef {{parse: Function, stringify: Function}} QueryStringLib
 */

/**
 *
 * @typedef {Object} FeatherRouter
 *
 * @property {Route} initialRoute - x
 * @property {Function} routeMatcher - x
 * @property {Function} getRoute - x
 * @property {Function} getHref - x
 * @property {Function} toPath - x
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
 * @property {Function} toPath - x
 * @property {Function} locationBarSync - x
 * @property {Function} effect - x
 */

const createGetPath = (prefix, historyMode) =>
  historyMode
    ? () =>
        decodeURI(window.location.pathname + window.location.search).substring(prefix.length) || "/"
    : () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

const getPathLookup = routeConfig =>
  Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

const createToPath = (prefix, pathLookup, getQueryString) => (id, params = {}) => {
  const path = prefix + pathLookup[id];

  return (
    (path.match(/(:[^/]*)/g) || []).reduce(
      (result, pathParam) =>
        result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
      path
    ) + getQueryString(params.queryParams)
  );
};

const createGetRoute = (prefix, toPath) => (page, params = {}) => ({
  page,
  params,
  url: toPath(page, params).substring(prefix.length)
});

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
 * @param {createRouteMatcher} createRouteMatcher - the feather route matcher function.
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

  const pathLookup = getPathLookup(routeConfig);
  const getPath = createGetPath(prefix, historyMode);
  const toPath = createToPath(prefix, pathLookup, getQueryString);
  const getRoute = createGetRoute(prefix, toPath);
  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    return Object.assign(match, { params });
  };

  const initialRoute = routeMatcher(getPath());

  const start = ({ onRouteChange }) => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url + getQueryString(route.params.queryParams);

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const getHref = (page, params = {}) => {
    const url = page.startsWith("/") ? prefix + page : toPath(page, params);

    return {
      href: url,
      onclick: evt => {
        evt.preventDefault();
        window.history.pushState({}, "", url);
        window.onpopstate();
      }
    };
  };

  const effect = state => {
    locationBarSync(state[routeProp]);
  };

  return { initialRoute, routeMatcher, getRoute, getHref, toPath, start, locationBarSync, effect };
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

  const pathLookup = getPathLookup(routeConfig);
  const getPath = createGetPath(prefix, false);
  const toPath = createToPath(prefix, pathLookup, getQueryString);
  const getRoute = createGetRoute(prefix, toPath);

  const createMithrilRoutes = ({ App, onRouteChange, states, update, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, url) => onRouteChange({ page, params, url }),
        render: () => m(App, { state: states(), update, actions })
      };
      return result;
    }, {});

  const locationBarSync = path => {
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state[routeProp].url);
  };

  return { createMithrilRoutes, getRoute, toPath, locationBarSync, effect };
};
