/**
 * `meiosis-routing/state`
 *
 * The `state` module contains functions for managing routes in the application state.
 *
 * @module state
 */

/**
 * Route segment params.
 */
export type Params = Record<string, any>;

/**
 * A route segment.
 */
export interface RouteSegment {
  id: string;
  params: Params;
}

/**
 * A function that creates a [[RouteSegment]] with optional params.
 */
export type RouteParamFn = (params?: Record<string, any>) => RouteSegment;

/**
 * A Route is an array of route segments.
 */
export type Route = RouteSegment[];

/**
 * Convenience route segment lookup for route transitions.
 */
export interface RouteLookup {
  [key: string]: RouteSegment;
}

/**
 * The route transition indicates the [[Route]] that the user is leaving, to which they are
 * arriving, and for which parameters have changed.
 */
export interface RouteTransition {
  leave: RouteLookup;
  arrive: RouteLookup;
}

/**
 * Routing instance with navigation objects and functions.
 */
export interface RoutingObject {
  /** the current [[Route]]. */
  route: Route;

  /** the route index, used internally. */
  index: number;

  /** the [[RouteSegment]] for the local route. */
  localSegment: RouteSegment;

  /** the [[RouteSegment]] for the child route. */
  childSegment: RouteSegment;

  /** returns the [[RoutingObject]] for the next child. */
  next: () => RoutingObject;

  /** returns the parent [[Route]]. */
  parentRoute: () => Route;

  /** returns the [[Route]] for the current route plus the given child route. */
  childRoute: (child: Route | RouteSegment) => Route;

  /** returns the [[Route]] for the current route plus the given sibling route. */
  siblingRoute: (sibling: Route | RouteSegment) => Route;

  /** returns the same route with the given params. */
  sameRoute: (params: Record<string, any>) => Route;
}

////////

// fastDeepEqual credit: https://github.com/epoberezkin/fast-deep-equal
// This version does not handle Date and RegExp, because we shouldn't have those types when
// parsing a URL string.
const isArray = Array.isArray;
const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

const fastDeepEqual = (a, b): boolean => {
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

const defaultEmpty = (route: Route | null): Route => (Array.isArray(route) ? route : []);

/**
 * Creates a `Route` helper with functions to create route segments.
 *
 * @param routeNames the list of route names.
 * @returns a `Route` object with constructor functions.
 *
 * @example
 *
 * ```
 *
 * const Route = createRouteSegments(["Home", "User"]);
 *
 * Route.Home()
 * // { id: "Home", params: {} }
 *
 * Route.User({ name: "duck" })
 * // { id: "User", params: { name: "duck" } }
 * ```
 */
export function createRouteSegments(routeNames: string[]): Record<string, RouteParamFn> {
  return routeNames.reduce((result, id): Record<string, RouteParamFn> => {
    result[id] = (params: Record<string, any>): RouteSegment => ({
      id,
      params: params == null ? {} : params
    });
    return result;
  }, {});
}

/**
 * Looks for a route segment, with matching params, in a route.
 *
 * @param route the route to search.
 * @param routeSegmentWithParams the route segment to search for in the route.
 * @returns the matching Route segment, or `undefined` if `route` is empty or the route segment
 * was not found.
 */
export function findRouteSegmentWithParams(
  route: Route | null,
  routeSegmentWithParams: RouteSegment
): RouteSegment | undefined {
  return defaultEmpty(route).find(
    (routeSegment: RouteSegment): boolean =>
      routeSegment.id === routeSegmentWithParams.id &&
      fastDeepEqual(routeSegment.params, routeSegmentWithParams.params)
  );
}

/**
 * Looks for a Route segment, regardless of the params, in a route.
 *
 * @param route the route to search.
 * @param id the route segment, or just the id of the route segment, to search for in the route.
 * @returns the matching Route segment, or `undefined` if `route` is empty or a route segment with
 * the given id was not found.
 */
export function findRouteSegment(
  route: Route | null,
  id: RouteSegment | string
): RouteSegment | undefined {
  const findId = (id as RouteSegment).id || id;
  return defaultEmpty(route).find((routeSegment): boolean => routeSegment.id === findId);
}

/**
 * Calculates the difference between two routes.
 *
 * @param from
 * @param to
 * @returns the route representing the segments that are in the `from` route but not in the `to`
 * route.
 */
export function diffRoute(from: Route | null, to: Route | null): RouteLookup {
  const init: RouteLookup = {};

  return defaultEmpty(from).reduce(
    (result: RouteLookup, fromRouteSegment: RouteSegment): RouteLookup => {
      if (findRouteSegmentWithParams(to, fromRouteSegment) === undefined) {
        result[fromRouteSegment.id] = fromRouteSegment;
      }
      return result;
    },
    init
  );
}

/**
 * Calculates route transitions, providing `leave`, `arrive`, and `params` to indicate the route
 * segments for the route that we are leaving, the route to which we are arriving, and the route
 * for which params have changed, respectively.
 *
 * @param currentRoute the current route, before navigation.
 * @param nextRoute the route to which we are navigating.
 * @returns an object with `leave`, `arrive`, and `params` properties.
 */
export function routeTransition(currentRoute: Route, nextRoute: Route): RouteTransition {
  return {
    leave: diffRoute(currentRoute, nextRoute),
    arrive: diffRoute(nextRoute, currentRoute)
  };
}

/**
 * Calls a function with a value only if the value is not `null` or `undefined`.
 *
 * @param value the value to check.
 * @param fn the function to call if `value` is present.
 * @returns the result of calling `fn(value)`, or `null` if `value` is absent.
 */
export function whenPresent(value: any, fn: (x: any) => any): any {
  return value != null ? fn(value) : null;
}

/**
 * @constructor [[RoutingObject]]
 *
 * @param route the current route, for example `state.route.current`.
 * @param index the route segment index. This is used internally and you should not specify a value
 * for this parameter.
 *
 * @example
 *
 * ```
 *
 * // in root component
 * const Root = ({ state }) => {
 *   const routing = Routing(state.route.current);
 *   const Component = componentMap[routing.localSegment.id];
 *
 *   return (
 *     <div>
 *       <Component // other props... // routing={routing} />
 *     </div>
 *   );
 * };
 *
 * // in child component
 * const Child = ({ state, routing }) => {
 *   const Component = componentMap[routing.childSegment.id];
 *   const params = routing.localSegment.params;
 *
 *   return (
 *     <div>
 *       <a href={router.toPath(routing.parentRoute())}>...</a>
 *       <a href={router.toPath(routing.childRoute(Route.Child()))}>...</a>
 *       <a href={router.toPath(
 *         routing.siblingRoute([Route.Sibling(), Route.Details()])
 *       )}>...</a>
 *
 *       <Component // other props... // routing={routing.next()} />
 *     </div>
 *   );
 * };
 * ```
 */
export function Routing(route: Route = [], index = 0): RoutingObject {
  return {
    route,
    index,
    localSegment: route[index] === undefined ? { id: "", params: {} } : route[index],
    childSegment: route[index + 1] === undefined ? { id: "", params: {} } : route[index + 1],
    next: (): RoutingObject => Routing(route, index + 1),
    parentRoute: (): Route => route.slice(0, index),
    childRoute: (child: Route | RouteSegment): Route => route.slice(0, index + 1).concat(child),
    siblingRoute: (sibling: Route | RouteSegment): Route => route.slice(0, index).concat(sibling),
    sameRoute: (params: Record<string, any>): Route =>
      route
        .slice(0, index)
        .concat({ id: route[index].id, params })
        .concat(route.slice(index + 1))
  };
}
