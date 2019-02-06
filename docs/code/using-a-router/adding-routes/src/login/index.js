import { PS } from "patchinko/explicit";

import { onChange, get } from "../util";
import { navigateTo } from "../util/router";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update(Object.assign({ user: username }, navigateTo("Home")))
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Login") {
        // Navigating to Login
        update({
          route: PS({ next: state.route.request }),
          login: PS({
            username: "",
            password: ""
          })
        });
      }
    });
    onChange(states, ["route", "previous"], state => {
      if (state.route.previous.id === "Login") {
        // Leaving Login
        update({
          login: PS({
            message: null
          })
        });
      }
    });
  }
};

export { Login } from "./view";
