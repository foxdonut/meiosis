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

    login: (username, returnTo) =>
      update(Object.assign({
        user: username
      }, navigateTo([ returnTo || Route.Home() ])))
  }),

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
