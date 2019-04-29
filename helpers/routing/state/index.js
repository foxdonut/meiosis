const shallowEqual = (obj1, obj2) => {
  if (obj1 === obj2) {
    return true;
  }
  if (obj1 == null || obj2 == null) {
    return false;
  }

  const keys = Object.keys(obj1);

  if (keys.length === Object.keys(obj2).length) {
    for (let i = 0, t = keys.length; i < t; i++) {
      const key = keys[i];
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
  return false;
};

export const findRouteSegmentWithParams = (route, routeSegmentWithParams) =>
  route.find(
    routeSegment =>
      routeSegment.id === routeSegmentWithParams.id &&
      shallowEqual(routeSegment.params, routeSegmentWithParams.params)
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
