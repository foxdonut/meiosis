import queryString from "query-string";

export const createRouter = (Route, defaultRoute) => {
  const prefix = "#!";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const toPath = (route, queryParams = {}) =>
    prefix + Route.toURL(route) + getQueryString(queryParams);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = Route.matchOr(() => defaultRoute, pathWithoutQuery);
    return Object.assign(match, {
      queryParams: queryString.parse(getQuery(path))
    });
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = toPath(route, route.queryParams).substring(prefix.length);

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { initialRoute, start, locationBarSync, toPath, effect };
};
