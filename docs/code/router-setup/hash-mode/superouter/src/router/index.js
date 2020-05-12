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

  const routeMatcher = path => {
    const match = Route.matchOr(() => defaultRoute, getPathWithoutQuery(path));
    return Object.assign(match, {
      queryParams: queryString.parse(getQuery(path))
    });
  };

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = toPath(route, route.queryParams).substring(prefix.length);

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  const effect = state => {
    locationBarSync(state.route);
  };

  return { initialRoute, start, locationBarSync, toPath, effect };
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

export const allRoutes = routes(Object.keys(routeConfig));

export const router = createRouter(Route, Route.of.Home());
