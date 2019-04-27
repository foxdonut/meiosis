// This code will be moved to a reusable helper
import createRouteMatcher from "feather-route-matcher";

const getConfig = config =>
  config == null ? ["/", {}] : typeof config === "string" ? [config, {}] : config;

const pick = (obj, props) =>
  props.reduce((result, prop) => {
    result[prop] = obj[prop];
    return result;
  }, {});

const findPathParams = path => {
  const match = path.match(/:[^/]*/g);

  if (match) {
    return match.map(param => param.substring(1));
  } else {
    return [];
  }
};

const setParams = (path, params) =>
  findPathParams(path).reduce((result, pathParam) => {
    const value = params[pathParam];
    const key = ":" + pathParam;
    const idx = result.indexOf(key);
    return result.substring(0, idx) + value + result.substring(idx + key.length);
  }, path);

const convertToPath = (routeConfig, routes) => {
  let path = "";
  let lookup = routeConfig;

  routes.forEach(route => {
    const [configPath, children] = getConfig(lookup[route.id]);
    path += setParams(configPath, route.params);
    lookup = children;
  });

  return path;
};

// Returns { "/path": fn(params) => [route] }
const createRouteMap = (routeConfig = {}, path = "", fn = () => [], acc = {}) =>
  Object.entries(routeConfig).reduce((result, [id, config]) => {
    const [configPath, children] = getConfig(config);

    const localPath = path + configPath;
    const pathParams = findPathParams(localPath);
    const routeFn = params => fn(params).concat({ id, params: pick(params, pathParams) });
    result[localPath] = routeFn;
    createRouteMap(children, localPath, routeFn, result);
    return result;
  }, acc);

const getPath = () => document.location.hash || "#/";
export const setPath = path => window.history.pushState({}, "", path);

export const createRouter = ({ routeConfig, defaultRoute }) => {
  const routeMap = createRouteMap(routeConfig);
  const routeMatcher = createRouteMatcher(routeMap);

  const parsePath = path => {
    const match = routeMatcher(path);

    if (match) {
      return match.page(match.params);
    } else {
      return defaultRoute;
    }
  };

  const toPath = route => "#" + convertToPath(routeConfig, route);

  // Function to keep the location bar in sync
  const locationBarSync = state => {
    // if (!state.route.current[0].id === "Invalid") {
    const path = toPath(state.route.current);
    if (getPath() !== path) {
      setPath(path);
    }
    // }
  };

  // Listen to location changes and call navigateTo()
  const start = ({ navigateTo }) => {
    const parsePathAndNavigate = () => navigateTo(parsePath(getPath().substring(1)));
    window.onpopstate = parsePathAndNavigate;

    // Initial navigation
    parsePathAndNavigate();
  };

  return { toPath, locationBarSync, start };
};
