import { createRouteSegments } from "meiosis-routing/state";

export const Route = createRouteSegments([
  "Home",
  "Login",
  "Settings",
  "Tea",
  "Coffee",
  "Beer"
]);

export const navTo = route => ({
  route: { current: route }
});
