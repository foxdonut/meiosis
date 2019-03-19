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
  case: route.case,
  value: (route.case === local.case) || (route.value.child.case === local.case)
    ? omit(route.value, "child")
    : parentRoute(route.value.child, local)
});

export const siblingRoute = (route, local, child) => {
  const result = parentRoute(route, local);
  result.value = Object.assign({ child }, result.value);
  return result;
};

export const childRoute = (route, local, child) => {
  if (route.case === local.case) {
    const value = Object.assign({}, local.value, { child });
    const result = Object.assign({}, local, { value });
    return result;
  }
  else {
    const result = parentRoute(route, local);
    result.value = Object.assign({
      child: {
        case: local.case,
        value: Object.assign({}, local.value, { child })
      }
    }, result.value);
    return result;
  }
};

export const routeList = route =>
  route ? [ route ].concat(routeList(route.value.child)) : [];

export const navigateTo = route => ({
  route: route,
  arriving: true
});

export const root = {
  actions: update => ({
    navigateTo: route => update(navigateTo(route))
  })
};
