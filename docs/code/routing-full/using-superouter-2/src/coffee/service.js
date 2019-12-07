import { otherwise, run } from "stags";

import { coffees } from "../beverage/data";
import { Route, otherRoutes } from "../routes";
import { Data, K } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K({ coffees: Data.None(undefined) })),
      Coffee: () => (Data.isNone(state.coffees) ? { coffees: Data.Loading() } : null)
    })
  );

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(null)),
      Coffee: () => {
        run(
          state.coffees,
          Data.fold({
            ...otherwise(["None", "Loaded"])(K(null)),
            Loading: () => {
              setTimeout(() => update({ coffees: Data.Loaded(coffees) }), 1000);
            }
          })
        );
      }
    })
  );
