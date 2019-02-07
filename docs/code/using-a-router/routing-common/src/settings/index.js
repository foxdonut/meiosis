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
        Change: route => T(route.leave, fold({
          Settings: () => {
            update({
              routeStatus: caseOf("Arrive", route.destination)
            });
          }
        })),

        Arrive: route => T(route, fold({
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
