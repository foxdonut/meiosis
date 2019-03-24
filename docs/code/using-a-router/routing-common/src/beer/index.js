import { contains, fold } from "static-tagged-union";

import { beers } from "../beverage";
import { Loaded, Route } from "../root";
import { T, Tpipe } from "../util";

export const beer = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Beer()),
      fold({
        Y: () => T(state.beers, fold({
          N: () => {
            if (!state.pleaseWait) {
              update({ pleaseWait: true });
            }

            setTimeout(() => update({
              pleaseWait: false,
              beverages: beers,
              beers: Loaded.Y()
            }), 1000);
          }
        })),
        N: () => T(state.beers, fold({
          Y: () => update({ beers: Loaded.N() })
        }))
      })
    )
};
