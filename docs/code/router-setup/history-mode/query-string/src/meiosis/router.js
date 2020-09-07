import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

export const createRouter = routeConfig => {
  const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);

  const prefix = stripTrailingSlash(window.location.pathname);

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

  const matcher = createRouteMatcher(routeConfig);

  const toRoute = (path, options) => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const queryParams = queryString.parse(getQuery(path));
    const url = prefix + stripTrailingSlash(match.url) + getQueryString(queryParams);
    return Object.assign({ page: match.value, params: match.params, queryParams, url }, options);
  };

  const replaceRoute = path => toRoute(path, { replace: true });

  const initialRoute = toRoute(getPath());

  const toUrl = path => prefix + path;

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    window.history.pushState({}, "", url);
    window.onpopstate();
  };

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(toRoute(getPath()));
  };

  const syncLocationBar = route => {
    const url = route.url;

    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { initialRoute, toRoute, replaceRoute, toUrl, getLinkHandler, start, syncLocationBar };
};
