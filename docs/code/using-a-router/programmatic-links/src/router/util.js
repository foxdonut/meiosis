// This code will be moved to a reusable helper
import pathToRegexp from "path-to-regexp";

const I = x => x;

const getConfig = config => (typeof config === "string" ? [config, {}] : config);

const pick = (obj, props) =>
  props.reduce((result, prop) => {
    result[prop] = obj[prop];
    return result;
  }, {});

const convert = (result, pathParams, routeFn) => {
  const rest = result.slice(1);
  const params = pathParams.reduce((acc, key, index) => {
    acc[key] = rest[index];
    return acc;
  }, {});
  return routeFn(params);
};

// Returns [ fn(url) => route ]
const createRouteExecs = (routeConfig = {}, path = "", fn = () => [], acc = []) =>
  Object.entries(routeConfig).reduce((result, [id, config]) => {
    const [configPath, children] = getConfig(config);

    const localPath = path + configPath;
    const keys = [];
    const re = pathToRegexp(localPath, keys);
    const pathParams = keys.map(key => key.name);
    const routeFn = params => fn(params).concat({ id, params: pick(params, pathParams) });
    const exec = url => {
      const found = re.exec(url);
      return found && convert(found, pathParams, routeFn);
    };
    result.push(exec);
    createRouteExecs(children, localPath, routeFn, result);
    return result;
  }, acc);

const convertToPath = (routeConfig, route) => {
  let path = "";
  let lookup = routeConfig;

  route.forEach(route => {
    const [configPath, children] = getConfig(lookup[route.id]);
    path += pathToRegexp.compile(configPath)(route.params);
    lookup = children;
  });

  return path;
};

const getPath = () => document.location.hash || "#/";
const setPath = path => window.history.pushState({}, "", path);

export const createRouter = ({ routeConfig, navigateTo, defaultRoute }) => {
  const routeExecs = createRouteExecs(routeConfig);

  const parsePath = path => {
    const result = routeExecs
      .map(exec => exec(path))
      .filter(I)
      .slice(-1)[0];

    return result || defaultRoute;
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
  const parsePathAndNavigate = () => navigateTo(parsePath(getPath().substring(1)));
  window.onpopstate = parsePathAndNavigate;

  // Initial navigation
  parsePathAndNavigate();

  return { toPath, locationBarSync };
};
