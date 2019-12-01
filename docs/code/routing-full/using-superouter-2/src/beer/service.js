import { otherwise, run } from "stags";

import { beers } from "../beverage/data";
import { Route, otherRoutes } from "../routes";
import { Data, K } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      // FIXME: reset beverages to Data.None()
      ...otherRoutes(K(null)),
      Beer: () => (Data.isNone(state.beverages) ? { beverages: Data.Loading() } : null)
    })
  );

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(null)),
      Beer: () => {
        run(
          state.beverages,
          Data.fold({
            ...otherwise(["None", "Loaded"])(K(null)),
            Loading: () => {
              setTimeout(() => update({ beverages: Data.Loaded(beers) }), 1000);
            }
          })
        );
      }
    })
  );
