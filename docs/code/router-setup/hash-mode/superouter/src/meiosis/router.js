import queryString from "query-string";

export const createRouter = (Route, defaultRoute) => {
  const prefix = "#!";

  const getUrl = () => decodeURI(window.location.hash || prefix + "/");
  const getPath = () => getUrl().substring(prefix.length);

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (params = {}) => {
    const query = queryString.stringify(params);
    return (query.length > 0 ? "?" : "") + query;
  };

  const toUrl = (route, params = {}) => prefix + Route.toURL(route) + getQueryString(params);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = Route.matchOr(() => defaultRoute, pathWithoutQuery);
    return Object.assign(match, { params: queryString.parse(getQuery(path)) });
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const syncLocationBar = route => {
    const url = toUrl(route, route.params);

    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { initialRoute, toUrl, start, syncLocationBar };
};
