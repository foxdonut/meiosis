import { otherwise, run } from "stags";

import { beers } from "../beverage/data";
import { Route, otherRoutes } from "../routes";
import { Data, K } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K({ beers: Data.None(undefined) })),
      Beer: () => (Data.isNone(state.beers) ? { beers: Data.Loading() } : null)
    })
  );

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(null)),
      Beer: () => {
        run(
          state.beers,
          Data.fold({
            ...otherwise(["None", "Loaded"])(K(null)),
            Loading: () => {
              setTimeout(() => update({ beers: Data.Loaded(beers) }), 1000);
            }
          })
        );
      }
    })
  );
