import { TaggedUnion, Maybe } from "static-tagged-union";

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
  "Brewer"
]);

export const initRoute = routes => ({
  routes,
  index: -1,
  local: null,
  child: routes[0]
});

export const childRoute = route => {
  const index = route.index + 1;
  return {
    routes: route.routes,
    index,
    local: route.routes[index],
    child: route.routes[index + 1]
  };
};

export const Loaded = Maybe;

export const root = {
  actions: update => ({
    navigateTo: routeList => update({
      routeCurrent: routeList
    }),

    navigateToParent: route => update({
      routeCurrent: route.routes.slice(0, route.index)
    }),

    navigateToChild: (route, routeList) => update({
      routeCurrent: route.routes.concat(routeList)
    }),

    navigateToSibling: (route, routeList) => update({
      routeCurrent: route.routes.slice(0, route.index).concat(routeList)
    })
  })
};
