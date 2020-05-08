import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import { TaggedUnionChecked } from "static-tagged-union";

const createRouter = routeConfig => {
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

  const pathLookup = Object.entries(routeConfig).reduce(
    (result, [path, route]) => Object.assign(result, { [route().id]: path }),
    {}
  );

  const toPath = route => {
    const path = prefix + pathLookup[route.id];

    return (
      [...path.matchAll(/(:[^/]*)/g)]
        .map(a => a[1])
        .reduce(
          (result, pathParam) =>
            result.replace(new RegExp(pathParam), encodeURI(route.params[pathParam.substring(1)])),
          path
        ) + getQueryString(route.params.queryParams)
    );
  };

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path => {
    const match = matcher(getPathWithoutQuery(path));

    return match.page(
      Object.assign(match.params, {
        queryParams: queryString.parse(getQuery(path))
      })
    );
  };

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = toPath(route).substring(prefix.length);

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, start, locationBarSync, toPath };
};

export const Route = TaggedUnionChecked("Route", [
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "TeaSearch"
]);

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea/search": Route.TeaSearch,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails
};

export const router = createRouter(routeConfig);
