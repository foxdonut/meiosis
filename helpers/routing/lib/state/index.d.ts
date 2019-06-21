/**
 * `meiosis-routing/state`
 *
 * The `state` module contains functions for managing routes in the application state.
 *
 * @module state
 */
/**
 * A route segment.
 */
export interface RouteSegment {
    id: string;
    params: Record<string, any>;
}
/**
 * A function that creates a [[RouteSegment]] with optional params.
 */
export declare type RouteParamFn = (params?: Record<string, any>) => RouteSegment;
/**
 * A Route is an array of route segments.
 */
export declare type Route = RouteSegment[];
/**
 * The route state.
 */
export interface RouteState {
    previous: Route;
    current: Route;
}
/**
 * The route transition indicates the [[Route]] that the user is leaving and to which they are
 * arriving.
 */
export interface RouteTransition extends RouteState {
    leave: Route;
    arrive: Route;
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
}
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
export declare function createRouteSegments(routeNames: string[]): Record<string, RouteParamFn>;
/**
 * Looks for a route segment, with matching params, in a route.
 *
 * @param route the route to search.
 * @param routeSegmentWithParams the route segment to search for in the route.
 * @returns the matching Route segment, or `undefined` if `route` is empty or the route segment
 * was not found.
 */
export declare function findRouteSegmentWithParams(route: Route | null, routeSegmentWithParams: RouteSegment): RouteSegment | undefined;
/**
 * Looks for a Route segment, regardless of the params, in a route.
 *
 * @param route the route to search.
 * @param id the route segment, or just the id of the route segment, to search for in the route.
 * @returns the matching Route segment, or `undefined` if `route` is empty or a route segment with
 * the given id was not found.
 */
export declare function findRouteSegment(route: Route | null, id: RouteSegment | string): RouteSegment | undefined;
/**
 * Calculates the difference between two routes.
 *
 * @param from
 * @param to
 * @returns the route representing the segments that are in the `from` route but not in the `to`
 * route.
 */
export declare function diffRoute(from: Route | null, to: Route | null): Route;
/**
 * Calculates route transitions, providing `leave` and `arrive` to indicate the route segments for
 * the route that we are leaving, and the route to which we are arriving, respectively.
 *
 * @param state the route state.
 * @returns an object with `previous`, `current`, `leave`, and `arrive` properties.
 */
export declare function routeTransition(routeState: RouteState): RouteTransition;
/**
 * Calls a function with a value only if the value is not `null` or `undefined`.
 *
 * @param value the value to check.
 * @param fn the function to call if `value` is present.
 * @returns the result of calling `fn(value)`, or `null` if `value` is absent.
 */
export declare function whenPresent(value: any, fn: (x: any) => any): any;
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
export declare function Routing(route?: Route, index?: number): RoutingObject;
