import { PS } from "patchinko/explicit";
import { bifoldCase } from "stags";

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
        routeCurrent: Route.Home(),
        user: username
      })
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      bifoldCase(Route.Login())(
        () => {
          update({ login: PS({ message: null }) });
          /*
          return (!(state.login.username || state.login.password)
            || state.user
            || confirm("You have unsaved data. Discard?"));
          */
        },
        () => {
          update({
            login: PS({
              username: "",
              password: ""
            })
          });
        }
      )(state.routeCurrent);
    });
  }
};
