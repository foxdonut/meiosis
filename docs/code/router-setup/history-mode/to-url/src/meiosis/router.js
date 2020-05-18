/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

export const createRouter = routeConfig => {
  const prefix = window.location.pathname;

  const getUrl = () => decodeURI(window.location.pathname + window.location.search);
  const getPath = () => getUrl().substring(prefix.length) || "/";
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, id]) => Object.assign(result, { [id]: path }),
    {}
  );

  const toUrl = (id, params = {}) => {
    const path = prefix + pathLookup[id];

    return (
      (path.match(/(:[^/]*)/g) || []).reduce(
        (result, pathParam) =>
          result.replace(new RegExp(pathParam), encodeURI(params[pathParam.substring(1)])),
        path
      ) + getQueryString(params.queryParams)
    );
  };

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));
    const params = Object.assign(match.params, {
      queryParams: queryString.parse(getQuery(path))
    });
    const url = prefix + match.url + getQueryString(params.queryParams);
    return Object.assign(match, { params, url });
  };

  const getRoute = (page, params = {}) => ({
    page,
    params,
    url: toUrl(page, params)
  });

  const initialRoute = routeMatcher(getPath());

  const getHref = (page, params = {}) => {
    const url = toUrl(page, params);

    return {
      href: url,
      onclick: evt => {
        evt.preventDefault();
        window.history.pushState({}, "", url);
        window.onpopstate();
      }
    };
  };

  const start = ({ onRouteChange }) => {
    window.onpopstate = () => onRouteChange(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    if (route.url !== getUrl()) {
      window.history.pushState({}, "", route.url);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { initialRoute, getRoute, getHref, start, locationBarSync, effect };
};
