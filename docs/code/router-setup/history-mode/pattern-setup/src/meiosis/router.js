/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";

export const createRouter = routeConfig => {
  const pathname = window.location.pathname;
  const prefix = pathname.endsWith("/") ? pathname.substring(0, pathname.length - 1) : pathname;

  const getPath = () => decodeURI(window.location.pathname).substring(prefix.length) || "/";

  const getRoute = createRouteMatcher(routeConfig);

  const initialRoute = getRoute(getPath());

  const toUrl = path => prefix + path;

  const getLinkHandler = url => evt => {
    evt.preventDefault();
    window.history.pushState({}, "", url);
    window.onpopstate();
  };

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(getRoute(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url;

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { initialRoute, getRoute, toUrl, getLinkHandler, start, locationBarSync, effect };
};
