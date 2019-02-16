import { PS } from "patchinko/explicit";

import { caseOf } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeNext: [caseOf("Home")],
      user: null
    })
  }),

  routing: {
    ValidateArrive: ({ state }) => {
      if (!state.user) {
        return {
          routeNext: [caseOf("Login")],
          login: PS({
            message: "Please login."
          })
        };
      }
    }
  }
};
