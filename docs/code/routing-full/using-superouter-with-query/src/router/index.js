import { type } from "superouter";
import queryString from "query-string";

const createRouter = (Route, defaultRoute) => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/").substring(prefix.length);
  const getPathWithoutQuery = path => path.replace(/\?.*/, "");

  const getQuery = path => {
    const idx = path.indexOf("?");
    return idx >= 0 ? path.substring(idx + 1) : "";
  };

  const getQueryString = (queryParams = {}) => {
    const query = queryString.stringify(queryParams);
    return (query.length > 0 ? "?" : "") + query;
  };

  const toPath = (route, queryParams = {}) =>
    prefix + Route.toURL(route) + getQueryString(queryParams);

  const routeMatcher = path =>
    Object.assign(Route.matchOr(() => defaultRoute, getPathWithoutQuery(path)), {
      queryParams: queryString.parse(getQuery(path))
    });

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = Route.toURL(route) + getQueryString(route.queryParams);
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, start, locationBarSync, toPath };
};

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: "/tea",
  TeaDetails: "/tea/:id",
  TeaSearch: "/tea/search"
};

export const Route = type("Route", routeConfig);

export const routes = keys => fn =>
  keys.reduce((result, key) => Object.assign(result, { [key]: fn }), {});

const allKeys = Object.keys(routeConfig);
export const allRoutes = routes(allKeys);

export const router = createRouter(Route, Route.of.Home());
