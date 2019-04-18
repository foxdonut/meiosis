import { Route, findRoute } from "../routes";

export const accept = state => {
  if (
    !findRoute(state.route, "Login") &&
    !state.user &&
    state.login &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    return { route: [Route.Login()] };
  }
};
