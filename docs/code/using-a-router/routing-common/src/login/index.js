import { PS } from "patchinko/explicit";
import { fold } from "static-tagged-union";

import { Route } from "../root";
import { get } from "../util";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update({
        routeCurrent: [Route.Home()],
        user: username
      })
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  service: (state, update) => {
    if (state.arriving) {
      state.routeCurrent.forEach(fold({
        Login: () => {
          update({
            arriving: false,
            login: PS({
              username: "",
              password: ""
            })
          });
        }
      }));
    }
  }
};
