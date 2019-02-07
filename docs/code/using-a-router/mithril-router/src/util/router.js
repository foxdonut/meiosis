import m from "mithril";
import pathToRegexp from "path-to-regexp";

const routeMap = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Coffee: "/coffee",
  CoffeeDetails: "/coffee/:id",
  Beer: "/beer",
  BeerDetails: "/beer/:id",
  BeerBrewer: "/beer/:id/brewer"
};

const toPathMap = Object.entries(routeMap).reduce((result, [id, path]) => {
  result[id] = pathToRegexp.compile(path);
  return result;
}, {});

const getPath = () => document.location.hash;
const setPath = path => window.history.pushState({}, "", path);

// converts { case, value } to path
export const toPath = route => "#!" + toPathMap[route.case](route.value);

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

export const createRoutes = ({ states, actions, update, App }) =>
  Object.entries(routeMap).reduce((result, [id, path]) => {
    result[path] = {
      onmatch: value => update({
        routeStatus: {
          case: "Request",
          value: { case: id, value }
        }
      }),
      render: () => m(App, { state: states(), actions })
    };
    return result;
  }, {});
