/* Equivalent of this code, you can also npm install meiosis-router-setup */
/* See https://meiosis.js.org/router for details. */
import createRouteMatcher from "feather-route-matcher";
import { selectors } from "../state";

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

  const effect = state => {
    const path = selectors.url(state);

    if (path !== getPath()) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, getRoute, toUrl, getLinkHandler, start, effect };
};
