import { createRouteSegments } from "meiosis-routing/state";

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
