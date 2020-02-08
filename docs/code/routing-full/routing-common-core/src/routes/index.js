import { Actions, createRouteSegments, routeTransition } from "meiosis-routing/state";

export { navigateTo } from "meiosis-routing/state";

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

const service = ({ previousState, state }) => ({
  routeTransition: () => routeTransition(previousState.route, state.route)
});

export const routes = {
  Actions,
  service
};
