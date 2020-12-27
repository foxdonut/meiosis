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

  const toRoute = (path, options) => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const queryParams = queryString.parse(getQuery(path));
    const url = prefix + match.url + getQueryString(queryParams);
    return Object.assign({ page: match.value, params: match.params, queryParams, url }, options);
  };

  const replaceRoute = path => toRoute(path, { replace: true });

  const start = onRouteChange => {
    const routeChange = () => onRouteChange(toRoute(getPath()));
    routeChange();
    window.onpopstate = routeChange;
  };

  const syncLocationBar = route => {
    const url = route.url;

    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { toRoute, replaceRoute, start, syncLocationBar };
};
