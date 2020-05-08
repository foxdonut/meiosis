/* global MeiosisRouting */

const { createRouteSegments } = MeiosisRouting.state;
const { createFeatherRouter } = MeiosisRouting.routerHelper;

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
  nextRoute: Array.isArray(route) ? route : [route]
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
  Beer: ["/beer?type&country", beverageRoutes]
};

export const router = createFeatherRouter({
  createRouteMatcher,
  queryString,
  routeConfig,
  defaultRoute: [Route.NotFound()]
});
