import { PS } from "patchinko/explicit";
import { fold } from "static-tagged-union";

import { Route } from "../root";
import { get, onChange } from "../util";

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

  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      state.routeCurrent.forEach(fold({
        Login: () => {
          update({
            login: PS({
              username: "",
              password: ""
            })
          });
        },
        _: () => {
          update({ login: PS({ message: null }) });
          /*
          return (!(state.login.username || state.login.password)
            || state.user
            || confirm("You have unsaved data. Discard?"));
          */
        }
      }));
    });
  }
};
