/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

export const createRouter = routeConfig => {
  const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);

  const origin = window.location.origin;
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

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, page]) => Object.assign(result, { [page]: path }),
    {}
  );

  const toUrl = (page, params = {}, queryParams = {}) => {
    const path = prefix + stripTrailingSlash(pathLookup[page]);
    const pathParams = [];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce((result, pathParam) => {
        pathParams.push(pathParam.substring(1));
        return result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)]));
      }, path) + getQueryString(queryParams)
    );
  };

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const pathWithoutQuery = path.replace(/\?.*/, "");
    const match = matcher(pathWithoutQuery);
    const queryParams = queryString.parse(getQuery(path));
    return { page: match.value, params: match.params, queryParams };
  };

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    window.history.pushState({}, "", url);
    window.onpopstate();
  };

  const start = onRouteChange => {
    const routeChange = () => onRouteChange(routeMatcher(getPath()));
    routeChange();
    window.onpopstate = routeChange;

    const linkHandler = evt => {
      let element = evt.target;
      while (element && element.nodeName.toLowerCase() !== "a") {
        element = element.parentNode;
      }
      if (
        element &&
        element.nodeName.toLowerCase() === "a" &&
        element.href.startsWith(origin) &&
        element.href.indexOf(prefix) >= 0
      ) {
        evt.preventDefault();
        window.history.pushState({}, "", element.href);
        window.onpopstate();
      }
    };

    window.addEventListener("click", linkHandler, false);

    window.addEventListener("beforeunload", () => {
      window.removeEventListener("click", linkHandler);
    });
  };

  const syncLocationBar = route => {
    const { page, params, queryParams } = route;
    const url = toUrl(page, params, queryParams);
    if (url !== getUrl()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", url);
    }
  };

  return { toUrl, getLinkHandler, start, syncLocationBar };
};
