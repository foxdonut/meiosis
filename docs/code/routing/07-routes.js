/* global m, MeiosisRouting */
const { createRouteSegments } = MeiosisRouting.state;
const { createMithrilRouter } = MeiosisRouting.routerHelper;

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
  Beer: ["/beer?type&country", beverageRoutes],
  NotFound: "/:404..."
};

export const router = createMithrilRouter({
  m,
  routeConfig
});
