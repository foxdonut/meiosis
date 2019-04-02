import { PS } from "patchinko/explicit";
import { contains, fold } from "static-tagged-union";

import { Route, navigateTo } from "../routes";
import { Tpipe } from "../util";

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
            return navigateTo([ Route.Login() ]);
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
