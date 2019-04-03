import { contains, fold } from "static-tagged-union";

import { Route } from "../routes";
import { Tpipe } from "../util";

export const settings = {
  actions: {
    logout: () => ({
      user: null,
      route: [ Route.Home() ]
    })
  },

  accept: state =>
    Tpipe(
      state.route,
      contains(Route.Settings()),
      fold({
        Y: () => {
          if (!state.user) {
            return {
              route: [ Route.Login({ message: "Please login.", returnTo: Route.Settings() }) ]
            };
          }
        }
      })
    )
};
