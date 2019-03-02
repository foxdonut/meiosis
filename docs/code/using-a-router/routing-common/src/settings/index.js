import { fold } from "static-tagged-union";

import { Route } from "../root";
import { onChange } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeCurrent: [Route.Home()],
      user: null
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
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
    });
  }
};
