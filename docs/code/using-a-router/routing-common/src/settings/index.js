import { PS } from "patchinko/explicit";

import { T, caseOf, fold, onChange } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeStatus: caseOf("Request", caseOf("Home")),
      user: null
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeStatus"], state => {
      T(state.routeStatus, fold({
        Leaving: route => T(route.from, fold({
          Settings: () => {
            update({
              routeStatus: caseOf("Arriving", route.to)
            });
          }
        })),

        Arriving: route => T(route, fold({
          Settings: () => {
            if (state.user) {
              update({
                routeCurrent: route,
                routeStatus: caseOf("None"),
              });
            }
            else {
              update({
                routeStatus: caseOf("Request", caseOf("Login")),
                login: PS({
                  message: "Please login."
                })
              });
            }
          }
        }))
      }));
    });
  }
};
