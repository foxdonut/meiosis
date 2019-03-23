import { contains, map } from "static-tagged-union";

import { Route, navigateTo, routeList } from "../root";
import { Tpipe } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({
      user: null
    }, navigateTo(Route.Home())))
  }),

  service: (state, update) => (state.arriving) && (() =>
    Tpipe(
      state.route,
      routeList,
      contains(Route.Settings()),
      map(() => {
        if (!state.user) {
          update(navigateTo(
            Route.Login({ message: "Please login." })
          ));
        }
      })
    )
  )
};
