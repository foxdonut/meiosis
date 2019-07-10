import { findRouteSegment } from "meiosis-routing/state";

import { Route, navigateTo } from "../routes";

export const accept = state => {
  if (findRouteSegment(state.route.current, "Settings") && !state.user) {
    return navigateTo(Route.Login({ message: "Please login.", returnTo: Route.Settings() }));
  }
};
