import { PS } from "patchinko/explicit";

import { caseOf, get } from "../util";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update({
        routeStatus: caseOf("Request", [caseOf("Home")]),
        user: username
      })
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  routing: {
    Leaving: ({ transition, state, update }) => {
      if (!(state.login.username || state.login.password)
          || state.user
          || confirm("You have unsaved data. Discard?"))
      {
        update({
          routeStatus: caseOf("Arriving", transition.to),
          login: PS({
            message: null
          })
        });
      }
    },

    Arriving: ({ routes, update }) => {
      update({
        routeCurrent: routes,
        routeStatus: caseOf("None"),
        login: PS({
          username: "",
          password: ""
        })
      });
    }
  }
};
