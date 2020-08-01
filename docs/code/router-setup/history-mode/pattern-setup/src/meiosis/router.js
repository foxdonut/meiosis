/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";

export const createRouter = routeConfig => {
  const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);

  const prefix = stripTrailingSlash(window.location.pathname);

  const getUrl = () => decodeURI(window.location.pathname);
  const getPath = () => getUrl().substring(prefix.length) || "/";

  const matcher = createRouteMatcher(routeConfig);

  const toRoute = (path, options) => {
    const match = matcher(path);
    return Object.assign(match, options, { url: prefix + stripTrailingSlash(match.url) });
  };

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

  return { initialRoute, toRoute, toUrl, getLinkHandler, start, syncLocationBar };
};
