import { PS } from "patchinko/explicit";
import { contains, fold } from "static-tagged-union";

import { Route, navigateTo } from "../root";
import { Tpipe } from "../util";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update(Object.assign({
        user: username
      }, navigateTo([ Route.Home() ])))
  }),

  computed: state => ({
    usernameLength: state.login && state.login.username.length
  }),

  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Login()),
      fold({
        Y: () => {
          if (!state.login) {
            update({
              login: PS({
                username: "",
                password: ""
              })
            });
          }
        },
        N: () => {
          if (state.login) {
            update({ login: null });
          }
        }
      })
    )
};
