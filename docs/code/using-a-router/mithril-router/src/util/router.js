import m from "mithril";
//import pathToRegexp from "path-to-regexp";

import { Route } from "routing-common/src/root";

/*
const beverageRoutes = [
  { path: "", route: Route.Beverages },
  { path: "/:id", route: Route.Beverage, children: [
    { path: "/brewer", route: Route.Brewer }
  ] }
];

const routeMap = [
  { path: "/", route: Route.Home },
  { path: "/login", route: Route.Login },
  { path: "/settings", route: Route.Settings },
  { path: "/tea", route: Route.Tea, children: [
    { path: "/:id", route: Route.TeaDetails }
  ] },
  { path: "/coffee", route: Route.Coffee, children: beverageRoutes },
  { path: "/beer", route: Route.Beer, children: beverageRoutes }
];

const beverageRoutes = {
  Route.Beverages,
  Route.Beverage: { path: "/:id", children: {
    Route.Brewer: { path: "/brewer" }
  } }
}

const routeMap = {
  Route.Home: { path: "/" },
  Route.Login: { path: "/login" },
  Route.Settings: { path: "/settings" },
  Route.Tea: { path: "/tea", children: {
    Route.TeaDetails: { path: "/:id" }
  } },
  Route.Coffee: { path: "/coffee", children: beverageRoutes },
  Route.Beer: { path: "/beer", children: beverageRoutes }
}
*/

const routeMap = {
  "/": () => Route.Home(),
  "/login": () => Route.Login(),
  "/settings": () => Route.Settings(),
  "/tea": () => Route.Tea(),
  "/tea/:id": ({ id }) => Route.Tea({ child: Route.TeaDetails({ id }) }),
  "/coffee": () => Route.Coffee({ child: Route.Beverages() }),
  "/coffee/:id": ({ id }) => Route.Coffee({ child: Route.Beverage({ id }) }),
  "/coffee/:id/brewer":
    ({ id }) => Route.Coffee({ child: Route.Beverage({ id, child: Route.Brewer() }) }),
  "/beer": () => Route.Beer({ child: Route.Beverages() }),
  "/beer/:id": ({ id }) => Route.Beer({ child: Route.Beverage({ id }) }),
  "/beer/:id/brewer":
    ({ id }) => Route.Beer({ child: Route.Beverage({ id, child: Route.Brewer() }) })
};

/*

"/beer/:id/brewer"
  ^v
Route.Beer({
  child: Route.Beverage({
    id,
    child: Route.Brewer()
  })
})

*/

/*
const toPathMap = Object.entries(routeMap).reduce((result, [id, path]) => {
  result[id] = pathToRegexp.compile(path);
  return result;
}, {});

const getPath = () => document.location.hash;
const setPath = path => window.history.pushState({}, "", path);
*/

// converts { case, value } to path
// export const toPath = route => "#!" + toPathMap[route.case](route.value);

// Keeps the location bar in sync
/*
export const LocationBarSync = ({ state }) => {
  if (state.route.case) {
    const path = toPath(state.route);
    if (getPath() !== path) {
      setPath(path);
    }
  }
  return null;
};
*/

export const createRoutes = ({ states, actions, App }) =>
  Object.entries(routeMap).reduce((result, [path, fn]) => {
    result[path] = {
      onmatch: value => actions.navigateTo(fn(value)),
      render: () => m(App, { state: states(), actions })
    };
    return result;
  }, {});
