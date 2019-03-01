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

export const Loaded = Maybe;

export const root = {
  actions: update => ({
    navigateTo: routeList => update({
      routeCurrent: routeList
    }),

    navigateToParent: (currentRoutes, index) => update({
      routeCurrent: currentRoutes.slice(0, index)
    }),

    navigateToChild: (currentRoutes, routeList) => update({
      routeCurrent: currentRoutes.concat(routeList)
    }),

    navigateToSibling: (currentRoutes, index, routeList) => update({
      routeCurrent: currentRoutes.slice(0, index).concat(routeList)
    })
  })
};
