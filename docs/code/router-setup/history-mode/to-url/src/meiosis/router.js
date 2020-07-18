/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import { selectors } from "../state";

export const createRouter = routeConfig => {
  const pathname = window.location.pathname;
  const prefix = pathname.endsWith("/") ? pathname.substring(0, pathname.length - 1) : pathname;

  const getUrl = () => decodeURI(window.location.pathname + window.location.search);
  const getPath = () => getUrl().substring(prefix.length) || "/";

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  const toUrl = (page, params = {}) => {
    const path = prefix + pathLookup[page];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(params.queryParams)
    );
  };

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    const url = prefix + match.url + getQueryString(params.queryParams);
    return Object.assign(match, { params, url });
  };

  const getRoute = (page, params = {}) =>
    selectors.toRoute({
      page,
      params,
      url: toUrl(page, params)
    });

  const initialRoute = routeMatcher(getPath());

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    window.history.pushState({}, "", url);
    window.onpopstate();
  };

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const effect = state => {
    const url = selectors.url(state);
    if (url !== getUrl()) {
      window.history.pushState({}, "", url);
    }
  };

  return { initialRoute, getRoute, toUrl, getLinkHandler, start, effect };
};
