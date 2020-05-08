import { createRouteSegments, routeTransition } from "meiosis-routing/state";
import { RouteConfig } from "meiosis-routing/router-helper";

export const Route = createRouteSegments(["Home", "Tea", "TeaDetails"]);

const beverageRoutes: RouteConfig = {
  Beverages: "",
  Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
};

export const routeConfig: RouteConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: ["/tea", { TeaDetails: "/:id" }],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer?type&country", beverageRoutes]
};

export const navigateTo = (route): any => ({ nextRoute: Array.isArray(route) ? route : [route] });
export const Actions = (update): any => ({ navigateTo: (route): any => update(navigateTo(route)) });

const service = (state): any => ({
  routeTransition: (): any => routeTransition(state.route, state.nextRoute),
  route: state.nextRoute
});

export const routes = {
  Actions,
  service
};
