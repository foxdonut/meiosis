import createRouteMatcher from "feather-route-matcher";

export const createRouter = routeConfig => {
  const prefix = "#!";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const featherRouteMatcher = createRouteMatcher(routeConfig);
  const routeMatcher = path => {
    const match = featherRouteMatcher(path);
    return { page: match.value, params: match.params, url: match.url };
  };
  const toRoute = routeMatcher;
  const replaceRoute = path => Object.assign(routeMatcher(path), { replace: true });

  const initialRoute = toRoute(getPath());

  const start = onRouteChange => {
    window.onpopstate = () => onRouteChange(toRoute(getPath()));
  };

  const syncLocationBar = route => {
    const path = route.url;

    if (path !== getPath()) {
      const fn = route.replace ? "replaceState" : "pushState";
      window.history[fn].call(window.history, {}, "", prefix + path);
    }
  };

  return { initialRoute, toRoute, replaceRoute, start, syncLocationBar };
};
