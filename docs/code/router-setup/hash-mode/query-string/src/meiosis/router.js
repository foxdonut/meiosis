/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

export const createRouter = routeConfig => {
  const prefix = "#";

  const getUrl = () => decodeURI(window.location.hash || prefix + "/");
  const getPath = () => getUrl().substring(prefix.length);
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const matcher = createRouteMatcher(routeConfig);

  const getRoute = path => {
    const match = matcher(getPathWithoutQuery(path));
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    const url = prefix + match.url + getQueryString(params.queryParams);
    return Object.assign(match, { params, url });
  };

  const initialRoute = getRoute(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(getRoute(getPath()));
  };

  const locationBarSync = route => {
    if (route.url !== getUrl()) {
      window.history.pushState({}, "", route.url);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { initialRoute, getRoute, start, locationBarSync, effect };
};
