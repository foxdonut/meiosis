import { contains, map, unless } from "static-tagged-union";

import { Route, navigateTo } from "../root";
import { Tpipe } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({
      user: null
    }, navigateTo([Route.Home()])))
  }),

  service: (state, update) => {
    unless(({ route }) =>
      Tpipe(
        route,
        contains(Route.Settings()),
        map(() => {
          if (!state.user) {
            update(navigateTo([
              Route.Login({ message: "Please login." })
            ]));
          }
        })
      )
    )(state.routeCurrent);
  }
};
