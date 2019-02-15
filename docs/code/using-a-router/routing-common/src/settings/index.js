import { PS } from "patchinko/explicit";

import { caseOf } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeStatus: caseOf("Request", [caseOf("Home")]),
      user: null
    })
  }),

  routing: {
    ValidateArrive: ({ state }) => {
      if (!state.user) {
        return {
          routeStatus: caseOf("ValidateArrive", [caseOf("Login")]),
          login: PS({
            message: "Please login."
          })
        };
      }
    }
  }
};
