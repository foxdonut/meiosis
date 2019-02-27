import { PS } from "patchinko/explicit";
import { foldCase } from "stags";

import { Route } from "../root";
import { onChange } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update({
      routeCurrent: Route.Home(),
      user: null
    })
  }),

  service: (states, update) => {
    onChange(states, ["routeCurrent"], state => {
      foldCase(Route.Settings())(
        null,
        () => {
          if (!state.user) {
            update({
              routeCurrent: Route.Login(),
              login: PS({
                message: "Please login."
              })
            });
          }
        }
      )(state.routeCurrent);
    });
  }
};
