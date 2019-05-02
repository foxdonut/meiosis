import fastDeepEqual from "fast-deep-equal";

export const findRouteSegmentWithParams = (route, routeSegmentWithParams) =>
  route.find(
    routeSegment =>
      routeSegment.id === routeSegmentWithParams.id &&
      fastDeepEqual(routeSegment.params, routeSegmentWithParams.params)
  );

export const diffRoute = (from, to) =>
  from.reduce(
    (result, route) => result.concat(findRouteSegmentWithParams(to, route) ? [] : route),
    []
  );

export const createRouteSegments = routeNames =>
  routeNames.reduce((result, id) => {
    result[id] = params => ({ id, params: params == null ? {} : params });
    return result;
  }, {});

export const findRouteSegment = (route, id) => {
  id = id.id || id;
  return route.find(routeSegment => routeSegment.id === id);
};

export const routeTransition = (from, to) => ({
  leave: diffRoute(from, to),
  arrive: diffRoute(to, from)
});

export const Routing = (route = [], index = 0) => ({
  route,
  index,
  localSegment: route[index] || {},
  childSegment: route[index + 1] || {},
  next: () => Routing(route, index + 1),
  parentRoute: () => route.slice(0, index),
  childRoute: child => route.slice(0, index + 1).concat(child),
  siblingRoute: sibling => route.slice(0, index).concat(sibling)
});
