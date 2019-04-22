import m from "mithril";
import pathToRegexp from "path-to-regexp";

const beverageRoutes = {
  Beverages: "",
  Beverage: [
    "/:id",
    {
      Brewer: "/brewer"
    }
  ]
};

const routeMap = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: [
    "/tea",
    {
      TeaDetails: "/:id"
    }
  ],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer", beverageRoutes],
  Invalid: "/:404..."
};

const getConfig = config => (typeof config === "string" ? [config, {}] : config);

const pick = (obj, props) =>
  props.reduce((result, prop) => {
    result[prop] = obj[prop];
    return result;
  }, {});

const createRouteMap = (routeMap = {}, path = "", fn = () => [], acc = {}) =>
  Object.entries(routeMap).reduce((result, [id, config]) => {
    const [configPath, children] = getConfig(config);

    const localPath = path + configPath;
    const keys = [];
    pathToRegexp(localPath, keys);
    const pathParams = keys.map(key => key.name);
    const routeFn = params => fn().concat({ id, params: pick(params, pathParams) });
    result[localPath] = routeFn;
    createRouteMap(children, localPath, routeFn, result);
    return result;
  }, acc);

const convertToPath = routes => {
  let path = "";
  let lookup = routeMap;

  routes.forEach(route => {
    const [configPath, children] = getConfig(lookup[route.id]);
    path += pathToRegexp.compile(configPath)(route.params);
    lookup = children;
  });

  return path;
};

const getPath = () => document.location.hash;
const setPath = path => window.history.pushState({}, "", path);

export const toPath = route => "#!" + convertToPath(route);

// Keeps the location bar in sync
export const LocationBarSync = {
  view: ({ attrs: { state } }) => {
    if (!state.route.current[0].id === "Invalid") {
      const path = toPath(state.route.current);
      if (getPath() !== path) {
        setPath(path);
      }
    }
    return null;
  }
};

export const createRoutes = ({ states, actions, App }) =>
  Object.entries(createRouteMap(routeMap)).reduce((result, [path, fn]) => {
    result[path] = {
      onmatch: value => actions.navigateTo(fn(value)),
      render: () => m(App, { state: states(), actions })
    };
    return result;
  }, {});
