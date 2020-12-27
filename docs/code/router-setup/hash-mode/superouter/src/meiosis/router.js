import queryString from "query-string";

export const createRouter = (Route, defaultRoute) => {
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

  const toUrl = (route, _params, queryParams = {}) =>
    prefix + Route.toURL(route) + getQueryString(queryParams);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = Route.matchOr(() => defaultRoute, pathWithoutQuery);
    return { page: match, queryParams: queryString.parse(getQuery(path)) };
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    const routeChange = () => onRouteChange(routeMatcher(getPath()));
    routeChange();
    window.onpopstate = routeChange;
  };

  const syncLocationBar = route => {
    const url = toUrl(route.page, null, route.queryParams);

    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { initialRoute, toUrl, start, syncLocationBar };
};
