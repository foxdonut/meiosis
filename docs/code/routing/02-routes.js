/* global MeiosisRouting */

const { createRouteSegments } = MeiosisRouting.state;

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
