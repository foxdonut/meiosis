import { Route } from "../routes";

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
      const route = [Route.Login()];
      return {
        route,
        nextRoute: route,
        routeTransition: { leave: () => ({}), arrive: () => ({}) }
      };
    }
    return { login: null };
  }
};
