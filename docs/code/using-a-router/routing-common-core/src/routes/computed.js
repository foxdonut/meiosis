import { shallowEqual } from "../util";

export const findRouteWithParams = (routes, routeWithParams) =>
  routes.find(
    route => route.id === routeWithParams.id && shallowEqual(route.params, routeWithParams.params)
  );

const diffRoute = (from, to) =>
  from.reduce((result, route) => result.concat(findRouteWithParams(to, route) ? [] : route), []);

export const computed = state => {
  const routeLeave = diffRoute(state.routePrevious, state.route);
  const routeArrive = diffRoute(state.route, state.routePrevious);

  return {
    routePrevious: state.route,
    routeLeave,
    routeArrive
  };
};
