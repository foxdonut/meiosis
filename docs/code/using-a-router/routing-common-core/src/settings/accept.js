import { Route, findRoute, navigateTo } from "../routes";

export const accept = state => {
  if (findRoute(state.route.current, "Settings") && !state.user) {
    return navigateTo([Route.Login({ message: "Please login.", returnTo: Route.Settings() })]);
  }
};
