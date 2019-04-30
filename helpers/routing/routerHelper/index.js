export const findPathParams = path => {
  const match = path.match(/:[^/]*/g);

  if (match) {
    return match.map(param => param.substring(1));
  } else {
    return [];
  }
};

export const setParams = (path, params) =>
  findPathParams(path).reduce((result, pathParam) => {
    const value = params[pathParam];
    const key = ":" + pathParam;
    const idx = result.indexOf(key);
    return result.substring(0, idx) + value + result.substring(idx + key.length);
  }, path);

const getConfig = config =>
  config == null ? ["/", {}] : typeof config === "string" ? [config, {}] : config;

export const convertToPath = (routeConfig, routes) => {
  let path = "";
  let lookup = routeConfig;

  routes.forEach(route => {
    const [configPath, children] = getConfig(lookup[route.id]);
    path += setParams(configPath, route.params);
    lookup = children;
  });

  return path;
};

const pick = (obj, props) =>
  props.reduce((result, prop) => {
    result[prop] = obj[prop];
    return result;
  }, {});

// Returns { "/path": fn(params) => [route] }
export const createRouteMap = (routeConfig = {}, path = "", fn = () => [], acc = {}) =>
  Object.entries(routeConfig).reduce((result, [id, config]) => {
    const [configPath, children] = getConfig(config);

    const localPath = path + configPath;
    const pathParams = findPathParams(configPath);
    const routeFn = params => fn(params).concat({ id, params: pick(params, pathParams) });
    result[localPath] = routeFn;
    createRouteMap(children, localPath, routeFn, result);
    return result;
  }, acc);

export const createRouter = ({
  createParsePath,
  routeConfig,
  defaultRoute,
  prefix = "#",
  getPath,
  setPath,
  addLocationChangeListener
}) => {
  getPath = getPath || (() => document.location.hash || prefix + "/");
  setPath = setPath || (path => window.history.pushState({}, "", path));

  addLocationChangeListener =
    addLocationChangeListener ||
    (listener => {
      window.onpopstate = listener;
    });

  const routeMap = createRouteMap(routeConfig);
  const parsePathFn = createParsePath ? createParsePath(routeMap, defaultRoute) : null;
  const parsePath = parsePathFn ? path => parsePathFn(path.substring(prefix.length)) : null;

  const toPath = route => prefix + convertToPath(routeConfig, route);

  // Function to keep the location bar in sync
  const locationBarSync = route => {
    const path = toPath(route);
    if (getPath() !== path) {
      setPath(path);
    }
  };

  // Listen to location changes and call navigateTo()
  const start = ({ navigateTo }) => {
    const parsePathAndNavigate = () => navigateTo(parsePath(getPath()));
    addLocationChangeListener(parsePathAndNavigate);
  };

  const initialRoute = parsePath ? parsePath(getPath()) : null;

  return { initialRoute, locationBarSync, parsePath, routeMap, start, toPath };
};
