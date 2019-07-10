import { findRouteSegment } from "meiosis-routing/state";

import { navigateTo } from "../routes";

export const accept = state => {
  const currentLogin = findRouteSegment(state.route.current, "Login");
  const previousLogin = findRouteSegment(state.route.previous, "Login");

  if (
    !currentLogin &&
    previousLogin &&
    !state.user &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    return navigateTo(previousLogin);
  }
};
