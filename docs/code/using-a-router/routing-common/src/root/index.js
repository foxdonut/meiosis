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
export const Arrived = Maybe;

export const navigateTo = routeList => ({
  routeCurrent: Arrived.N({ route: routeList })
});

export const root = {
  actions: update => ({
    navigateTo: routeList => update(navigateTo(routeList)),

    navigateToParent: route => update(navigateTo(
      route.routes.slice(0, route.index)
    )),

    navigateToChild: (route, routeList) => update(navigateTo(
      route.routes.concat(routeList)
    )),

    navigateToSibling: (route, routeList) => update(navigateTo(
      route.routes.slice(0, route.index).concat(routeList)
    ))
  })
};
