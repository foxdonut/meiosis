import { Actions, accept, createRouteSegments } from "meiosis-routing/state";
import { RouteConfig } from "meiosis-routing/router-helper";

export { navigateTo } from "meiosis-routing/state";

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

export const routes = {
  Actions,
  accept
};
