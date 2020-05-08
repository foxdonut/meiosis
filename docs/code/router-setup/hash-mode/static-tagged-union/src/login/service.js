import { fold } from "static-tagged-union";

import { Route } from "../router";

export const service = state =>
  fold({
    Login: () => {
      if (!state.login || state.login.username == null) {
        return {
          login: {
            username: "",
            password: ""
          }
        };
      }
    },
    _: () => {
      if (
        !state.user &&
        state.login &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?")
      ) {
        return { route: () => Route.Login() };
      } else if (state.login) {
        return { login: undefined };
      }
    }
  })(state.route);
