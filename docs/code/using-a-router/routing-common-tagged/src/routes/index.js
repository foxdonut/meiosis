import { TaggedUnion, Maybe } from "static-tagged-union";

import { actions } from "./actions";

export const Route = TaggedUnion([
  "Loading",
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "Coffee",
  "Beer",
  "Beverages",
  "Beverage",
  "Brewer",
  "Invalid"
]);

export const Loaded = Maybe;

export const findRoute = (routes, id) => routes.find(route => route.id === id);

export const initRoute = routes => ({
  routes,
  index: 0,
  local: routes[0] || {},
  child: routes[1] || {}
});

export const nextRoute = route => {
  const index = route.index + 1;
  return {
    routes: route.routes,
    index,
    local: route.routes[index] || {},
    child: route.routes[index + 1] || {}
  };
};

export const parentRoute = route => route.routes.slice(0, route.index);

export const childRoute = (route, routes) => route.routes.slice(0, route.index + 1).concat(routes);

export const siblingRoute = (route, routes) => route.routes.slice(0, route.index).concat(routes);

export const routes = {
  actions
};
