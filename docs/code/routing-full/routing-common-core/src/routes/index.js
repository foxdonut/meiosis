import { createRouteSegments, routeTransition } from "meiosis-routing/state";

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
  Beer: ["/beer?type&country", beverageRoutes],
  NotFound: "/:404..."
};

export const navigateTo = route => ({ nextRoute: () => (Array.isArray(route) ? route : [route]) });
export const Actions = update => ({ navigateTo: route => update(navigateTo(route)) });

const service = state => ({
  routeTransition: () => routeTransition(state.route, state.nextRoute),
  route: state.nextRoute
});

export const routes = {
  Actions,
  service
};
