import { createRouteSegments } from "meiosis-routing/state";
import { RouteConfig } from "meiosis-routing/router-helper";

import { Actions } from "./actions";
import { accept } from "./accept";

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

export { navigateTo } from "./actions";

export const routes = {
  Actions,
  accept
};
