import { Route } from "../routes";

/*
import m from "mithril";
import { createMithrilRouter } from "meiosis-routing/router-helper";
import { routeConfig } from "routing-common/src/routes";

export const router = createMithrilRouter({
  m,
  routeConfig
});
*/

const getQuery = path => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

const getPathWithoutQuery = path => path.replace(/\?.*/, "");

const createRouter = ({ Route, defaultRoute }) => {
  const prefix = "#";

  const getPath = () => document.location.hash || prefix + "/";

  const setPath = path => window.history.pushState({}, "", path);

  const queryString = {};

  const addLocationChangeListener = listener => {
    window.onpopstate = listener;
  };

  const parsePathFn = (path, _queryParams) => Route.matchOr(() => defaultRoute, path);

  const parsePath = pathWithPrefix => {
    const path = pathWithPrefix.substring(prefix.length);
    const query = getQuery(path);
    const queryParams = query.length === 0 || !queryString.parse ? {} : queryString.parse(query);

    return parsePathFn(getPathWithoutQuery(path), queryParams);
  };

  const toPath = route => prefix + Route.toURL(route);

  // Function to keep the location bar in sync
  const locationBarSync = route => {
    const path = toPath(route);
    getPath() !== path && setPath(path);
  };

  // Listen to location changes and call navigateTo()
  const start = ({ navigateTo }) => {
    const parsePathAndNavigate = () => navigateTo(parsePath(getPath()));
    addLocationChangeListener(parsePathAndNavigate);
  };

  const initialRoute = parsePath(getPath());

  return { initialRoute, locationBarSync, parsePath, start, toPath };
};

export const router = createRouter({ Route, defaultRoute: Route.of.Home() });
