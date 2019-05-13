/**
 * A Route is an array of Route segments.
 *
 * @typedef {Array} Route
 */
import fastDeepEqual from "fast-deep-equal";

const defaultEmpty = route => (Array.isArray(route) ? route : []);

export const findRouteSegmentWithParams = (route, routeSegmentWithParams) =>
  defaultEmpty(route).find(
    routeSegment =>
      routeSegment.id === routeSegmentWithParams.id &&
      fastDeepEqual(routeSegment.params, routeSegmentWithParams.params)
  );

export const diffRoute = (from, to) =>
  defaultEmpty(from).reduce(
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
  return defaultEmpty(route).find(routeSegment => routeSegment.id === id);
};

export const routeTransition = ({ previous, current }) => ({
  previous: current,
  current: current,
  leave: diffRoute(previous, current),
  arrive: diffRoute(current, previous)
});

/**
 * @function Routing
 *
 * @param {Route} route
 * @param {number} index
 */
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
