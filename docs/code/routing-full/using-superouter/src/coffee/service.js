import { always as K, assoc, identity as I } from "ramda";
import { otherwise, run } from "stags";

import { coffees } from "../beverage/data";
import { Route, otherRoutes } from "../routes";
import { Data } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      // FIXME: reset beverages to Data.None()
      ...otherRoutes(K(I)),
      Coffee: () => (Data.isNone(state.beverages) ? assoc("beverages", Data.Loading()) : I)
    })
  );

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(I)),
      Coffee: () => {
        run(
          state.beverages,
          Data.fold({
            ...otherwise(["None", "Loaded"])(K(null)),
            Loading: () => {
              setTimeout(() => update(assoc("beverages", Data.Loaded(coffees))), 1000);
            }
          })
        );
      }
    })
  );
