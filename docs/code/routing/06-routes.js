import { createRouteSegments } from "meiosis-routing/state";
import { createFeatherRouter } from "meiosis-routing/router-helper";
import createRouteMatcher from "https://meiosis.js.org/lib/feather-route-matcher.js";
import queryString from "https://meiosis.js.org/lib/query-string.js";

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
  "Brewer",
  "NotFound"
]);

export const navTo = route => ({
  route: { current: route }
});

const beverageRoutes = {
  Beverages: "",
  Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
};

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: ["/tea", { TeaDetails: "/:id" }],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer?type", beverageRoutes]
};

export const router = createFeatherRouter({
  createRouteMatcher,
  queryString,
  routeConfig,
  defaultRoute: [Route.NotFound()]
});
