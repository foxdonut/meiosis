import { PS } from "patchinko/explicit";
import { fold, unless } from "static-tagged-union";

import { Arrived, Route, navigateTo } from "../root";
import { get } from "../util";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update(Object.assign({
        user: username
      }, navigateTo([Route.Home()])))
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  service: (state, update) => {
    unless(({ route }) =>
      route.forEach(fold({
        Login: () => {
          update({
            routeCurrent: Arrived.Y({ route }),
            login: PS({
              username: "",
              password: ""
            })
          });
        }
      }))
    )(state.routeCurrent);
  }
};
