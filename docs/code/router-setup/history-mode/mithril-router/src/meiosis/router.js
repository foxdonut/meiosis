/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import m from "mithril";

import { selectors } from "router-setup-common/src/selectors";

export const createMithrilRouter = routeConfig => {
  const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);

  const prefix = stripTrailingSlash(window.location.pathname);
  m.route.prefix = prefix;

  const getUrl = () => decodeURI(window.location.pathname + window.location.search);

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  const toUrl = (page, params = {}) => {
    const path = stripTrailingSlash(pathLookup[page]);
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

    return result + getQueryString(queryParams);
  };

  const createMithrilRoutes = ({ App, onRouteChange, states, update, actions, router }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: params => onRouteChange(selectors.toRoute(page, params)),
        render: () => m(App, { state: states(), update, actions, router })
      };
      return result;
    }, {});

  const syncLocationBar = route => {
    const { page, params } = route;
    if (page) {
      const url = prefix + toUrl(page, params);
      if (url !== getUrl()) {
        const fn = route.replace ? "replaceState" : "pushState";
        window.history[fn].call(window.history, {}, "", url);
      }
    }
  };

  return { createMithrilRoutes, toUrl, syncLocationBar };
};
