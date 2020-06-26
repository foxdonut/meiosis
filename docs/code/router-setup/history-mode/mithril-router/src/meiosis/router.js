/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import m from "mithril";

import { selectors } from "../state";

export const createMithrilRouter = routeConfig => {
  const pathname = window.location.pathname;
  const prefix = pathname.endsWith("/") ? pathname.substring(0, pathname.length - 1) : pathname;
  m.route.prefix = prefix;

  const getUrl = () => decodeURI(window.location.pathname + window.location.search);

  const initialRoute = { url: getUrl(), page: "", params: { queryParams: {} } };

  const getQueryString = (queryParams = {}) => {
    const query = m.buildQueryString(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const toUrl = (id, params = {}) => {
    const path = pathLookup[id];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(params.queryParams)
    );
  };

  const getRoute = (page, params = {}) =>
    selectors.toRoute({
      page,
      params,
      url: toUrl(page, params)
    });

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    m.route.set(url.substring(prefix.length));
  };

  const createMithrilRoutes = ({ App, onRouteChange, states, actions }) =>
    Object.entries(routeConfig).reduce((result, [path, page]) => {
      result[path] = {
        onmatch: (params, path) =>
          onRouteChange(selectors.toRoute({ page, params, url: prefix + path })),
        render: () => m(App, { state: states(), actions })
      };
      return result;
    }, {});

  const effect = state => {
    const url = selectors.url(state);
    if (url !== getUrl()) {
      window.history.pushState({}, "", url);
    }
  };

  return { createMithrilRoutes, initialRoute, getRoute, toUrl, getLinkHandler, effect };
};
