import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => {
      if (
        !state.user &&
        state.login &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?")
      ) {
        return { route: () => Route.of.Login() };
      } else if (state.login) {
        return { login: undefined };
      }
    }),
    Login: () => {
      if (!state.login || state.login.username == null) {
        return {
          login: {
            username: "",
            password: ""
          }
        };
      }
    }
  })(state.route);
