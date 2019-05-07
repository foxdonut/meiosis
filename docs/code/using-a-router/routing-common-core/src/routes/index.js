import { createRouteSegments } from "meiosis-routing/state";

import { Actions } from "./actions";
import { accept } from "./accept";

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

const beverageRoutes = {
  Beverages: "",
  Beverage: [
    "/:id",
    {
      Brewer: ["/brewer", ["id"]]
    }
  ]
};

export const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: [
    "/tea",
    {
      TeaDetails: "/:id"
    }
  ],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer?type", beverageRoutes]
};

export { navigateTo } from "./actions";

export const routes = {
  Actions,
  accept
};
