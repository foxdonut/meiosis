/**
 * `meiosis-routing/state`
 * @module state
 */
/**
 * A route segment.
 */
export declare type RouteSegment = {
    id: string;
    params: Object;
};
declare type RouteParamFn = (params: Object | null) => RouteSegment;
/**
 * A Route is an array of route segments.
 */
export declare type Route = RouteSegment[];
/**
 * Creates a `Route` helper with functions to create route segments.
 * @param {Array<string>} routeNames - the list of route names.
 * @returns {Constructor<RouteSegment>} - the `Route` with constructor functions.
 *
 * @example
 *
 * const Route = createRouteSegments(["Home", "User"]);
 *
 * Route.Home()
 * // { id: "Home", params: {} }
 *
 * Route.User({ name: "duck" })
 * // { id: "User", params: { name: "duck" } }
 */
export declare function createRouteSegments(routeNames: string[]): Record<string, RouteParamFn>;
/**
 * Looks for a route segment, with matching params, in a route.
 * @param {Route} route
 * @param {RouteSegment} routeSegmentWithParams
 * @returns {RouteSegment} - the matching Route segment, or `undefined` if `route` is empty or the
 * Route segment was not found.
 */
export declare function findRouteSegmentWithParams(route: Route, routeSegmentWithParams: RouteSegment): RouteSegment | undefined;
/**
 * Looks for a Route segment, regardless of the params, in a route.
 * @param {Route} route
 * @param {string} id
 * @returns {RouteSegment} - the matching Route segment, or `undefined` if `route` is empty or a
 * route segment with the given id was not found.
 */
export declare function findRouteSegment(route: Route, id: RouteSegment): RouteSegment | undefined;
export declare function diffRoute(from: Route, to: Route): Route;
/**
 * Calculates route transitions, providing `leave` and `arrive` to indicate the route segments for
 * the route that we are leaving, and the route to which we are arriving, respectively.
 * @param {Object} state the route state
 * @returns {Object} an object with `previous`, `current`, `leave`, and `arrive` properties.
 */
export declare function routeTransition({ previous, current }: {
    previous: any;
    current: any;
}): {
    previous: any;
    current: any;
    leave: RouteSegment[];
    arrive: RouteSegment[];
};
/**
 * `function whenPresent(value, fn): any`
 *
 * Calls a function with a value only if the value is not `null` or `undefined`.
 * @param {*} value the value to check
 * @param {function(value)} fn the function to call if `value` is present
 * @returns {*} - the result of calling `fn(value)`, or `null` if `value` is absent.
 */
export declare function whenPresent(value: any, fn: (x: any) => any): any;
/**
 * @constructor Routing
 *
 * @param {Route} route
 * @param {number} index
 *
 * @returns {routing} - a routing object
 */
export declare function Routing(route?: Route, index?: number): {
    route: RouteSegment[];
    index: number;
    localSegment: RouteSegment;
    childSegment: RouteSegment;
    next: () => any;
    parentRoute: () => RouteSegment[];
    childRoute: (child: any) => RouteSegment[];
    siblingRoute: (sibling: any) => RouteSegment[];
};
export {};
