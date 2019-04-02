import { contains, fold } from "static-tagged-union";

import { coffees } from "../beverage";
import { Loaded, Route } from "../routes";
import { T, Tpipe } from "../util";

export const coffee = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Coffee()),
      fold({
        Y: () => T(state.coffees, fold({
          N: () => {
            if (!state.pleaseWait) { // FIXME
              update({ pleaseWait: true });
            }

            setTimeout(() => update({
              pleaseWait: false,
              coffees: Loaded.Y(coffees)
            }), 1000);
          }
        })),
        N: () => T(state.coffees, fold({
          Y: () => update({ coffees: Loaded.N() })
        })),
      })
    )
};
