import createRouteMatcher from "feather-route-matcher";

export const createRouter = routeConfig => {
  const stripTrailingSlash = url => (url.endsWith("/") ? url.substring(0, url.length - 1) : url);

  const prefix = stripTrailingSlash(window.location.pathname);

  const getUrl = () => decodeURI(window.location.pathname);
  const getPath = () => getUrl().substring(prefix.length) || "/";

  const matcher = createRouteMatcher(routeConfig);

  const toRoute = (path, options) => {
    const match = matcher(path);
    return Object.assign(
      { page: match.value, params: match.params, url: prefix + stripTrailingSlash(match.url) },
      options
    );
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
