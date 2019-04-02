import { PS } from "patchinko/explicit";

import { Route, navigateTo } from "../routes";
import { contains } from "../util";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: (username, returnTo) =>
      update(Object.assign({
        user: username
      }, navigateTo([ returnTo || Route.Home() ])))
  }),

  accept: state => {
    if (!contains(state.route, "Login") &&
        !state.user &&
        state.login &&
        (state.login.username || state.login.password) &&
        !confirm("You have unsaved data. Continue?"))
    {
      return navigateTo([ Route.Login() ]);
    }
  },

  computed: state => {
    if (contains(state.route, "Login")) {
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
