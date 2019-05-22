/**
 * A Route is an array of Route segments.
 *
 * @typedef {Array} Route
 */

// fastDeepEqual credit: https://github.com/epoberezkin/fast-deep-equal
// This version does not handle Date and RegExp, because we shouldn't have those types when
// parsing a URL string.
const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

const fastDeepEqual = (a, b) => {
  if (a === b) return true;

  if (a && b && typeof a == "object" && typeof b == "object") {
    const arrA = isArray(a),
      arrB = isArray(b);

    let i, length, key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0; ) if (!fastDeepEqual(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    const keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length) return false;

    for (i = length; i-- !== 0; ) if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0; ) {
      key = keys[i];
      if (!fastDeepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  return a !== a && b !== b;
};

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

export const whenPresent = (obj, fn) => (obj != null ? fn(obj) : null);

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
