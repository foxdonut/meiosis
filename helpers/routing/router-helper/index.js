const getPathWithoutQuery = path => path.replace(/\?.*/, "");
const getQuery = path => {
  const idx = path.indexOf("?");
  return idx >= 0 ? path.substring(idx + 1) : "";
};

const extractMatches = matches => {
  if (matches) {
    return matches.map(param => param.substring(1));
  } else {
    return [];
  }
};

export const findPathParams = path => extractMatches(path.match(/:[^/?]*/g));
export const findQueryParams = path => extractMatches(path.match(/\?[^?]*/g));

export const setParams = (path, params) =>
  findPathParams(path).reduce((result, pathParam) => {
    const value = params[pathParam];
    const key = ":" + pathParam;
    const idx = result.indexOf(key);
    return result.substring(0, idx) + value + result.substring(idx + key.length);
  }, getPathWithoutQuery(path));

const getConfig = config =>
  config == null
    ? ["/", [], {}]
    : typeof config === "string"
    ? [config, [], {}]
    : config.length === 2
    ? Array.isArray(config[1])
      ? [config[0], config[1], {}]
      : [config[0], [], config[1]]
    : config;

const pick = (obj, props) =>
  props.reduce((result, prop) => {
    if (obj[prop] != null) {
      result[prop] = obj[prop];
    }
    return result;
  }, {});

export const convertToPath = (routeConfig, routes, qsStringify) => {
  let path = "";
  let lookup = routeConfig;
  let query = {};

  routes.forEach(route => {
    const [configPath, _parentParams, children] = getConfig(lookup[route.id]);
    path += setParams(configPath, route.params);
    lookup = children;

    const queryParams = findQueryParams(configPath);
    query = Object.assign(query, pick(route.params, queryParams));
  });

  if (Object.keys(query).length > 0 && typeof qsStringify === "function") {
    path += "?" + qsStringify(query);
  }

  return path;
};

// Returns { "/path": fn(params) => [route] }
export const createRouteMap = (routeConfig = {}, path = "", fn = () => [], acc = {}) =>
  Object.entries(routeConfig).reduce((result, [id, config]) => {
    const [configPath, parentParams, children] = getConfig(config);

    const routeParams = findPathParams(configPath)
      .concat(findQueryParams(configPath))
      .concat(parentParams);

    const localPath = path + getPathWithoutQuery(configPath);
    const routeFn = params => fn(params).concat({ id, params: pick(params, routeParams) });
    result[localPath] = routeFn;
    createRouteMap(children, localPath, routeFn, result);
    return result;
  }, acc);

export const createRouter = ({
  createParsePath,
  queryString,
  routeConfig,
  defaultRoute,
  prefix = "#",
  getPath,
  setPath,
  addLocationChangeListener
}) => {
  getPath = getPath || (() => document.location.hash || prefix + "/");
  setPath = setPath || (path => window.history.pushState({}, "", path));

  queryString = queryString || {};

  addLocationChangeListener =
    addLocationChangeListener ||
    (listener => {
      window.onpopstate = listener;
    });

  const routeMap = createRouteMap(routeConfig);
  const parsePathFn = createParsePath ? createParsePath(routeMap, defaultRoute) : null;

  const parsePath = parsePathFn
    ? pathWithPrefix => {
        const path = pathWithPrefix.substring(prefix.length);
        const query = getQuery(path);
        const queryParams =
          query.length === 0 || !queryString.parse ? {} : queryString.parse(query);

        return parsePathFn(getPathWithoutQuery(path), queryParams);
      }
    : null;

  const toPath = route => prefix + convertToPath(routeConfig, route, queryString.stringify);

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
