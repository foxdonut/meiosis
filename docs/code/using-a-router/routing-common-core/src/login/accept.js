import { Route, findRoute, navigateTo } from "../routes";

export const accept = state => {
  if (
    !findRoute(state.route.current, "Login") &&
    !state.user &&
    state.login &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    return navigateTo([Route.Login()]);
  }
};
