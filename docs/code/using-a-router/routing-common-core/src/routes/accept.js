import O from "patchinko/constant";

import { shallowEqual } from "../util";

export const findRouteWithParams = (routes, routeWithParams) =>
  routes.find(
    route => route.id === routeWithParams.id && shallowEqual(route.params, routeWithParams.params)
  );

const diffRoute = (from, to) =>
  from.reduce((result, route) => result.concat(findRouteWithParams(to, route) ? [] : route), []);

export const accept = state => {
  const leave = diffRoute(state.route.previous, state.route.current);
  const arrive = diffRoute(state.route.current, state.route.previous);

  return {
    route: O({
      previous: state.route.current,
      leave,
      arrive
    })
  };
};
