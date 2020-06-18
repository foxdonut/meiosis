/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import m from "mithril";

export const createMithrilRouter = routeConfig => {
  const prefix = "#!";
  m.route.prefix = prefix;

  const getUrl = () => decodeURI(window.location.hash || prefix + "/");

  const initialRoute = { url: getUrl() };

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const toUrl = (id, params = {}) => {
    const path = prefix + pathLookup[id];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(params.queryParams)
    );
  };

  const getRoute = (page, params = {}) => ({
    page,
    params,
    url: toUrl(page, params)
  });

  const createMithrilRoutes = ({ App, onRouteChange, states, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, path) => onRouteChange({ page, params, url: prefix + path }),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  const locationBarSync = route => {
    if (route.url !== getUrl()) {
      window.history.pushState({}, "", route.url);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { createMithrilRoutes, initialRoute, locationBarSync, getRoute, toUrl, effect };
};