import { Route, navigateTo } from "../routes";

export const service = state => {
  if (state.routeTransition.arrive.Login) {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  } else if (state.routeTransition.leave.Login) {
    if (
      !state.user &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      return navigateTo(Route.Login());
    }
    return { login: null };
  }
};
