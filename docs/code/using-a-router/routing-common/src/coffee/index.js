import { map } from "static-tagged-union";

import { coffees } from "../beverage";
import { Loaded, Route } from "../root";
import { Tpipe, contains } from "../util";

export const coffee = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.routeCurrent,
        contains(Route.Coffee()),
        map(() => {
          update({
            arriving: false,
            pleaseWait: true,
            beverages: state.beverages || []
          });

          setTimeout(() => update({
            pleaseWait: false,
            beverages: coffees,
            coffees: Loaded.Y()
          }), 1000);
        })
      );
    }

    Tpipe(
      state.routePrevious,
      contains(Route.Coffee()),
      map(() => update({ routePrevious: null, coffees: Loaded.N() }))
    );
  }
};
