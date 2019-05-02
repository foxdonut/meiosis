import { createRouter } from "meiosis-routing/router-helper";

/*
import createRouteMatcher from "feather-route-matcher";
// import queryString from "query-string";
import qs from "qs";

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
  createRouter({ createParsePath, queryString: qs, routeConfig, defaultRoute });
*/

/* */
import Mapper from "url-mapper";
import urlon from "urlon";

const createParsePath = (routeMap, defaultRoute) => {
  const urlMapper = Mapper();

  const parsePath = (path, queryParams) => {
    const matchedRoute = urlMapper.map(path, routeMap);

    if (matchedRoute) {
      return matchedRoute.match(Object.assign({}, matchedRoute.values, queryParams));
    } else {
      return defaultRoute;
    }
  };
  return parsePath;
};

export const Router = ({ routeConfig, defaultRoute }) =>
  createRouter({ createParsePath, queryString: urlon, routeConfig, defaultRoute });
/* */
