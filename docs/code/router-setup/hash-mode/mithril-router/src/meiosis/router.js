/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import m from "mithril";

export const createMithrilRouter = routeConfig => {
  const prefix = "#";
  m.route.prefix = prefix;

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const toPath = (id, params = {}) => {
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
    url: toPath(page, params).substring(prefix.length)
  });

  const createMithrilRoutes = ({ App, onRouteChange, states, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, url) => onRouteChange({ page, params, url }),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  const locationBarSync = path => {
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state.route.url);
  };

  return {
    createMithrilRoutes,
    locationBarSync,
    getRoute,
    toPath,
    effect
  };
};
