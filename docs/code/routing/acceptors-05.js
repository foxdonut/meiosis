import {
  findRouteSegment,
  routeTransition
} from "meiosis-routing/state";

import { Route, navTo } from "./routes-05";

export const loginAccept = state => {
  const currentLogin = findRouteSegment(
    state.route.current,
    "Login"
  );
  const previousLogin = findRouteSegment(
    state.route.previous,
    "Login"
  );

  if (
    !currentLogin &&
    previousLogin &&
    !state.user &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    return navTo([previousLogin]);
  }
};

export const settingsAccept = state => {
  if (
    findRouteSegment(state.route.current, "Settings") &&
    !state.user
  ) {
    return navTo([
      Route.Login({
        message: "Please login.",
        returnTo: Route.Settings()
      })
    ]);
  }
};

export const routeAccept = state => ({
  route: routeTransition(state.route)
});
