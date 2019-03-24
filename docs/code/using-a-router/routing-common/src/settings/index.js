import { contains, map } from "static-tagged-union";

import { Route, navigateTo } from "../root";
import { Tpipe } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({
      user: null
    }, navigateTo([ Route.Home() ])))
  }),

  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Settings()),
      map(() => {
        if (!state.user) {
          update(navigateTo(
            [ Route.Login({ message: "Please login." }) ]
          ));
        }
      })
    )
};
