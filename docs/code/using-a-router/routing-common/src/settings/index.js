import { fold } from "static-tagged-union";

import { Route } from "../root";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeCurrent: [Route.Home()],
      user: null
    })
  }),

  service: (state, update) => {
    /*
    state.routeCurrent.forEach(fold({
      Settings: () => {
        if (!state.user) {
          update({
            routeCurrent: [Route.Login({
              message: "Please login."
            })]
          });
        }
      }
    }));
    */
  }
};
