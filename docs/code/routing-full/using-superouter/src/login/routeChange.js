import { Route, otherRoutes } from "../routes";

export const routeChange = (route, state) =>
  Route.fold(
    Object.assign(otherRoutes(() => (state.login ? { route, login: undefined } : { route })), {
      Login: () => (!state.login ? { route, login: { username: "", password: "" } } : null)
    })
  )(route);

/*
  if (state.routeTransition.arrive.Login) {
    return {
      state: {
        login: {
          username: "",
          password: ""
        }
      }
    };
  } else if (state.routeTransition.leave.Login) {
    if (
      !state.user &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      return { patch: false };
    }
    return { state: { login: null } };
  }
*/
