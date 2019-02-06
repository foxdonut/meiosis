import { PS } from "patchinko/explicit";

import { navigateTo, onChange, get } from "../util";

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
    onChange(states, ["routeRequest"], state => {
      if (state.routeRequest.id === "Login") {
        // Navigating to Login
        update({
          routeNext: state.routeRequest,
          login: PS({
            username: "",
            password: ""
          })
        });
      }
    });
    onChange(states, ["routePrevious"], state => {
      if (state.routePrevious.id === "Login") {
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
