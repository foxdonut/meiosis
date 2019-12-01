import { otherwise, run } from "stags";

import { coffees } from "../beverage/data";
import { Route, otherRoutes } from "../routes";
import { Data, K } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      // FIXME: reset beverages to Data.None()
      ...otherRoutes(K(null)),
      Coffee: () => (Data.isNone(state.beverages) ? { beverages: Data.Loading() } : null)
    })
  );

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(null)),
      Coffee: () => {
        run(
          state.beverages,
          Data.fold({
            ...otherwise(["None", "Loaded"])(K(null)),
            Loading: () => {
              setTimeout(() => update({ beverages: Data.Loaded(coffees) }), 1000);
            }
          })
        );
      }
    })
  );
