import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

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

  const matcher = createRouteMatcher(routeConfig);

  const routeMatcher = path =>
    Object.assign(matcher(getPathWithoutQuery(path)), {
      queryParams: queryString.parse(getQuery(path))
    });

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onhashchange = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url + getQueryString(route.queryParams);

    if (getPath() !== path) {
      window.location.hash = prefix + path;
    }
  };

  return { initialRoute, routeMatcher, start, locationBarSync };
};

export const Route = {
  Home: "Home",
  Login: "Login",
  Settings: "Settings",
  Tea: "Tea",
  TeaDetails: "TeaDetails",
  TeaSearch: "TeaSearch",
  NotFound: "NotFound"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/settings": Route.Settings,
  "/tea/search": Route.TeaSearch,
  "/tea": Route.Tea,
  "/tea/:id": Route.TeaDetails,
  "/*": Route.NotFound
};

export const router = createRouter(routeConfig);
