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

export const findRouteWithParams = (routes, routeWithParams) =>
  routes.find(
    route => route.id === routeWithParams.id && shallowEqual(route.params, routeWithParams.params)
  );

export const diffRoute = (from, to) =>
  from.reduce((result, route) => result.concat(findRouteWithParams(to, route) ? [] : route), []);

export const createRoutes = routes =>
  routes.reduce((result, id) => {
    result[id] = params => ({ id, params: params == null ? {} : params });
    return result;
  }, {});

export const findRoute = (routes, id) => {
  id = id.id || id;
  return routes.find(route => route.id === id);
};

export const routeTransition = (from, to) => ({
  leave: diffRoute(from, to),
  arrive: diffRoute(to, from)
});

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

export const parentRoute = route => route.routes.slice(0, route.index);

export const childRoute = (route, routes) => route.routes.slice(0, route.index + 1).concat(routes);

export const siblingRoute = (route, routes) => route.routes.slice(0, route.index).concat(routes);
