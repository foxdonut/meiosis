import createRouteMatcher from "feather-route-matcher";

export const createRouter = routeConfig => {
  const prefix = "#!";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const routeMatcher = createRouteMatcher(routeConfig);
  const toRoute = (path, options) => Object.assign(routeMatcher(path), options);

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

  return { initialRoute, toRoute, start, syncLocationBar };
};
