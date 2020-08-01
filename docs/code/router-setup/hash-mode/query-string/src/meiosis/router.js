/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

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

  const matcher = createRouteMatcher(routeConfig);

  const toRoute = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const queryParams = queryString.parse(getQuery(path));
    const url = prefix + match.url + getQueryString(queryParams);
    return Object.assign(match, { params: match.params, queryParams, url });
  };

  const initialRoute = toRoute(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(toRoute(getPath()));
  };

  const syncLocationBar = route => {
    const url = route.url;
    if (url !== getUrl()) {
      window.history.pushState({}, "", url);
    }
  };

  return { initialRoute, toRoute, start, syncLocationBar };
};
