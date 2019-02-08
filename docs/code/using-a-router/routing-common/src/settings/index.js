import { PS } from "patchinko/explicit";

import { caseOf } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeStatus: caseOf("Request", caseOf("Home")),
      user: null
    })
  }),

  routing: {
    Arriving: ({ route, state, update }) => {
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
  }
};
