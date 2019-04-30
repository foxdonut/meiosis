import createRouteMatcher from "feather-route-matcher";
import { createRouter } from "meiosis-routing/routerHelper";

const createParsePath = (routeMap, defaultRoute) => {
  const routeMatcher = createRouteMatcher(routeMap);

  const parsePath = path => {
    const match = routeMatcher(path);

    if (match) {
      return match.page(match.params);
    } else {
      return defaultRoute;
    }
  };
  return parsePath;
};

export const Router = ({ routeConfig, defaultRoute }) =>
  createRouter({ createParsePath, routeConfig, defaultRoute });
