import { type } from "superouter";

const createRouter = (Route, defaultRoute) => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);

  const toPath = route => prefix + Route.toURL(route);

  const routeMatcher = path => Route.matchOr(() => defaultRoute, path);

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = toPath(route);
    if (getPath() !== path) {
      window.history.pushState({}, "", path);
    }
  };

  return { initialRoute, start, locationBarSync, toPath };
};

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: "/tea",
  TeaDetails: "/tea/:id"
};

export const Route = type("Route", routeConfig);

export const routes = keys => fn =>
  keys.reduce((result, key) => Object.assign(result, { [key]: fn }), {});

export const allRoutes = routes(Object.keys(routeConfig));

export const router = createRouter(Route, Route.of.Home());
