import m from "mithril@2.0.0-rc.4";
import { createRouteSegments } from "meiosis-routing/state";
import { createMithrilRouter } from "meiosis-routing/router-helper";

export const Route = createRouteSegments([
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "Coffee",
  "Beer",
  "Beverages",
  "Beverage",
  "Brewer"
]);

export const navTo = route => ({
  route: { current: route }
});

const beverageRoutes = {
  Beverages: "",
  Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
};

export const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: ["/tea", { TeaDetails: "/:id" }],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer?type", beverageRoutes]
};

export const router = createMithrilRouter({
  m,
  routeConfig,
  defaultRoute: [Route.Home()]
});
