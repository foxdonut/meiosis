import { findRoute } from "meiosis-routing/state";

import { navigateTo } from "../routes";

export const accept = state => {
  const currentLogin = findRoute(state.route.current, "Login");
  const previousLogin = findRoute(state.route.previous, "Login");

  if (
    !currentLogin &&
    previousLogin &&
    !state.user &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    return navigateTo([previousLogin]);
  }
};
