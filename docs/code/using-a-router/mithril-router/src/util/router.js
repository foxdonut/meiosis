import m from "mithril";
import pathToRegexp from "path-to-regexp";

import { Route } from "routing-common/src/root";

const beverageRoutes = {
  Beverages: { path: "" },
  Beverage: { path: "/:id", children: {
    Brewer: { path: "/brewer" }
  } }
};

const routeMap = {
  Home: { path: "/" },
  Login: { path: "/login" },
  Settings: { path: "/settings" },
  Tea: { path: "/tea", children: {
    TeaDetails: { path: "/:id" }
  } },
  Coffee: { path: "/coffee", children: beverageRoutes },
  Beer: { path: "/beer", children: beverageRoutes }
};

const createRouteMap = (routeMap = {}, path = "", fn = () => [], acc = {}) => Object.entries(routeMap)
  .reduce((result, [id, config]) => {
    const localPath = path + config.path;
    const routeFn = params => fn(params).concat([ Route[id](params) ]);
    result[localPath] = routeFn;
    createRouteMap(config.children, localPath, routeFn, result);
    return result;
  }, acc);

const convertToPath = routes => {
  let path = "";
  let lookup = routeMap;

  routes.forEach(route => {
    path += pathToRegexp.compile(lookup[route.id].path)(route.params);
    lookup = lookup[route.id].children;
  });

  return path;
};

/*
"/beer/:id/brewer"
  ^v
[ Route.Beer(), Route.Beverage({ id }), Route.Brewer() ]
*/

const getPath = () => document.location.hash;
const setPath = path => window.history.pushState({}, "", path);

export const toPath = route => "#!" + convertToPath(route);

// Keeps the location bar in sync
export const LocationBarSync = ({ state }) => {
  if (state.route.case) {
    const path = toPath(state.route);
    if (getPath() !== path) {
      setPath(path);
    }
  }
  return null;
};

/*
const routeMap = {
  "/": () => [ Route.Home() ],
  "/login": () => [ Route.Login() ],
  "/settings": () => [ Route.Settings() ],
  "/tea": () => [ Route.Tea() ],
  "/tea/:id": params => [ Route.Tea(), Route.TeaDetails(params) ],
  "/coffee": () => [ Route.Coffee(), Route.Beverages() ],
  "/coffee/:id": params => [ Route.Coffee(), Route.Beverage(params) ],
  "/coffee/:id/brewer": params => [ Route.Coffee(), Route.Beverage(params), Route.Brewer ],
  "/beer": () => [ Route.Beer(), Route.Beverages() ],
  "/beer/:id": params => [ Route.Beer(), Route.Beverage(params) ],
  "/beer/:id/brewer": params => [ Route.Beer(), Route.Beverage(params), Route.Brewer ]
};
*/

export const createRoutes = ({ states, actions, App }) =>
  Object.entries(createRouteMap(routeMap)).reduce((result, [path, fn]) => {
    result[path] = {
      onmatch: value => actions.navigateTo(fn(value)),
      render: () => m(App, { state: states(), actions })
    };
    return result;
  }, {});
