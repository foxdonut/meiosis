import { map } from "static-tagged-union";

import { beers } from "../beverage";
import { Loaded, Route } from "../root";
import { Tpipe, contains } from "../util";

export const beer = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.routeCurrent,
        contains(Route.Beer()),
        map(() => {
          update({
            arriving: false,
            pleaseWait: true,
            beverages: state.beverages || []
          });

          setTimeout(() => update({
            pleaseWait: false,
            beverages: beers,
            beers: Loaded.Y()
          }), 1000);
        })
      );
    }

    Tpipe(
      state.routePrevious,
      contains(Route.Beer()),
      map(() => update({ routePrevious: null, beers: Loaded.N() }))
    );
  }
};
