import { PS } from "patchinko/explicit";
import { fold } from "static-tagged-union";

import { Route, navigateTo, routeList } from "../root";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update(Object.assign({
        user: username
      }, navigateTo(Route.Home())))
  }),

  computed: state => ({
    usernameLength: state.login.username.length
  }),

  service: (state, update) => (state.arriving) && (() =>
    routeList(state.route).forEach(fold({
      Login: () => {
        update({
          arriving: false,
          login: PS({
            username: "",
            password: ""
          })
        });
      }
    }))
  )
};
