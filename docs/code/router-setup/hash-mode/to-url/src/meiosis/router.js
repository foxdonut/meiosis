/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import { selectors } from "../state";

export const createRouter = routeConfig => {
  const prefix = "#!";

  const getUrl = () => decodeURI(window.location.hash || prefix + "/");
  const getPath = () => getUrl().substring(prefix.length);

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

  const toUrl = (page, params = {}, queryParams = {}) => {
    const path = prefix + pathLookup[page];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(queryParams)
    );
  };

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const queryParams = queryString.parse(getQuery(path));
    return Object.assign(match, { params: match.params, queryParams });
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const syncLocationBar = route => {
    const { page, params, queryParams } = selectors.fromRoute(route);
    const url = toUrl(page, params, queryParams);
    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { initialRoute, toUrl, start, syncLocationBar };
};
