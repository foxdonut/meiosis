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

const omit = (obj, prop) => Object.keys(obj).reduce(
  (result, key) => {
    if (key !== prop) {
      result[key] = obj[key];
    }
    return result;
  }, {});

export const parentRoute = (route, local) => ({
  id: route.id,
  params: (route.id === local.id) || (route.params.child.id === local.id)
    ? omit(route.params, "child")
    : parentRoute(route.params.child, local)
});

export const siblingRoute = (route, local, child) => {
  const result = parentRoute(route, local);
  result.params = Object.assign({ child }, result.params);
  return result;
};

export const childRoute = (route, local, child) => {
  if (route.id === local.id) {
    const params = Object.assign({}, local.params, { child });
    const result = Object.assign({}, local, { params });
    return result;
  }
  else {
    const result = parentRoute(route, local);
    result.params = Object.assign({
      child: {
        id: local.id,
        params: Object.assign({}, local.params, { child })
      }
    }, result.params);
    return result;
  }
};

export const routeList = route =>
  route ? [ route ].concat(routeList(route.params.child)) : [];

export const navigateTo = route => ({
  route: route,
  arriving: true
});

export const root = {
  actions: update => ({
    navigateTo: route => update(navigateTo(route))
  })
};
