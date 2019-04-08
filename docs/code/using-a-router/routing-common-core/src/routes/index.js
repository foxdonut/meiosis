import { shallowEqual } from "../util";

export const Route = [
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
].reduce(
  (result, id) => {
    result[id] = params => ({ id, params: params == null ? {} : params });
    return result;
  }, {}
);

export const findRoute = (routes, id) =>
  routes.find(route => route.id === id);

export const findRouteWithParams = (routes, routeWithParams) =>
  routes.find(route => route.id === routeWithParams.id
    && shallowEqual(route.params, routeWithParams.params));

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

export const parentRoute = route =>
  route.routes.slice(0, route.index);

export const childRoute = (route, routes) =>
  route.routes.slice(0, route.index + 1).concat(routes);

export const siblingRoute = (route, routes) =>
  route.routes.slice(0, route.index).concat(routes);

const diffRoute = (from, to) => from.reduce(
  (result, route) => result.concat(findRouteWithParams(to, route) ? [] : route),
  []
);

export const routes = {
  computed: state => {
    const routeLeave = diffRoute(state.routePrevious, state.route);
    const routeArrive = diffRoute(state.route, state.routePrevious);

    return {
      routePrevious: state.route,
      routeLeave,
      routeArrive
    };
  }
};
