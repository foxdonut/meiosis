import { contains, fold } from "static-tagged-union";

import { Route, navigateTo } from "../root";
import { Tpipe } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({
      user: null
    }, navigateTo([ Route.Home() ])))
  }),

  computed: state =>
    Tpipe(
      state.route,
      contains(Route.Settings()),
      fold({
        Y: () => {
          if (!state.user) {
            return (navigateTo(
              [ Route.Login({ message: "Please login." }) ]
            ));
          }
        }
      })
    )
};
