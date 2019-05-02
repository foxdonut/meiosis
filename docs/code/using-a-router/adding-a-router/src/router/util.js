import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import { createRouter } from "meiosis-routing/router-helper";

const createParsePath = (routeMap, defaultRoute) => {
  const routeMatcher = createRouteMatcher(routeMap);

  const parsePath = (path, queryParams) => {
    const match = routeMatcher(path);

    if (match) {
      return match.page(Object.assign({}, match.params, queryParams));
    } else {
      return defaultRoute;
    }
  };
  return parsePath;
};

export const Router = ({ routeConfig, defaultRoute }) =>
  createRouter({ createParsePath, queryString, routeConfig, defaultRoute });
