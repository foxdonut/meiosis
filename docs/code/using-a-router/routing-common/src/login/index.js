import { PS } from "patchinko/explicit";

import { T, caseOf, fold, get, onChange } from "../util";

export const login = {
  actions: update => ({
    username: value =>
      update({ login: PS({ username: value })}),

    password: value =>
      update({ login: PS({ password: value })}),

    login: username =>
      update({
        routeStatus: caseOf("Request", caseOf("Home")),
        user: username
      })
  }),

  computed: state => ({
    usernameLength: (get(state, ["login", "username"]) || "").length
  }),

  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      T(state.routeStatus, fold({
        Leaving: route => T(route.from, fold({
          Login: () => {
            if (!(state.login.username || state.login.password)
                || state.user
                || confirm("You have unsaved data. Discard?"))
            {
              update({
                routeStatus: caseOf("Arriving", route.to),
                login: PS({
                  message: null
                })
              });
            }
          }
        })),

        Arriving: route => T(route, fold({
          Login: () => {
            update({
              routeCurrent: route,
              routeStatus: caseOf("None"),
              login: PS({
                username: "",
                password: ""
              })
            });
          }
        }))
      }));
    });
  }
};
