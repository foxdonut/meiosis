import { PS } from "patchinko/explicit";
import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe } from "../util";

export const login = {
  actions: {
    username: value => ({ login: PS({ username: value })}),
    password: value => ({ login: PS({ password: value })}),

    login: (username, returnTo) => ({
      user: username,
      route: [ returnTo || Route.Home() ]
    })
  },

  accept: state =>
    Tpipe(
      state.route,
      contains(Route.Login()),
      fold({
        N: () => {
          if (!state.user &&
              state.login &&
              (state.login.username || state.login.password) &&
              !confirm("You have unsaved data. Continue?"))
          {
            return { route: [ Route.Login() ] };
          }
        }
      })
    ),

  computed: state =>
    Tpipe(
      state.route,
      contains(Route.Login()),
      fold({
        Y: () => {
          if (!state.login) {
            return {
              login: PS({
                username: "",
                password: ""
              })
            };
          }
        },
        N: () => {
          if (state.login) {
            return { login: null };
          }
        }
      })
    )
};
