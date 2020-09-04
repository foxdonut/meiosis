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

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  const toUrl = (page, params = {}) => {
    const path = prefix + pathLookup[page];
    const pathParams = [];

    const result = (path.match(/(:[^/]*)/g) || []).reduce((result, pathParam) => {
      pathParams.push(pathParam.substring(1));
      return result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)]));
    }, path);

    const queryParams = Object.entries(params).reduce((result, [key, value]) => {
      if (pathParams.indexOf(key) < 0) {
        result[key] = value;
      }
      return result;
    }, {});

    return result + getQueryString(queryParams);
  };

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const queryParams = queryString.parse(getQuery(path));
    return { page: match.value, params: Object.assign(match.params, queryParams) };
  };

  const initialRoute = routeMatcher(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const syncLocationBar = route => {
    const { page, params } = route;
    const url = toUrl(page, params);
    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { initialRoute, toUrl, start, syncLocationBar };
};
