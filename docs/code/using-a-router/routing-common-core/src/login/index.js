import { PS } from "patchinko/explicit";

import { Route, findRoute } from "../routes";

export const login = {
  actions: {
    username: value => ({ login: PS({ username: value })}),
    password: value => ({ login: PS({ password: value })}),

    login: (username, returnTo) => ({
      user: username,
      route: [ returnTo || Route.Home() ]
    })
  },

  accept: state => {
    if (!findRoute(state.route, "Login") &&
        !state.user &&
        state.login &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?"))
    {
      return { route: [ Route.Login() ] };
    }
  },

  computed: state => {
    if (findRoute(state.route, "Login")) {
      if (!state.login) {
        return {
          login: PS({
            username: "",
            password: ""
          })
        };
      }
    }
    else if (state.login) {
      return { login: null };
    }
  }
};
