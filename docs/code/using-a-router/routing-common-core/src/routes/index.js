import { createRoutes } from "meiosis-routing/state";

import { Actions } from "./actions";
import { accept } from "./accept";

export const Route = createRoutes([
  "Loading",
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

export { navigateTo } from "./actions";

export const routes = {
  Actions,
  accept
};
