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

  const routeMatcher = createRouteMatcher(routeConfig);

  const getRoute = (path, queryParams) =>
    Object.assign(routeMatcher(getPathWithoutQuery(path)), {
      queryParams: Object.assign(queryString.parse(getQuery(path)), queryParams)
    });

  const initialRoute = getRoute(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(getRoute(getPath()));
  };

  const locationBarSync = route => {
    const query = queryString.stringify(route.queryParams);
    const path = route.url + (query.length > 0 ? "?" : "") + query;
    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, getRoute, start, locationBarSync };
};

const routeConfig = {
  "/": "Home",
  "/login": "Login",
  "/settings": "Settings",
  "/tea": "Tea",
  "/tea/:id": "TeaDetails"
};

export const router = createRouter(routeConfig);
