import { always as K, assoc, identity as I } from "ramda";
import { run } from "stags";

import { beers } from "../beverage/data";
import { Route, otherRoutes } from "../routes";
import { Data } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      // FIXME: reset beverages to Data.None()
      ...otherRoutes(K(I)),
      Beer: () => (Data.isNone(state.beverages) ? assoc("beverages", Data.Loading()) : I)
    })
  );

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(I)),
      Beer: () => {
        if (Data.isLoading(state.beverages)) {
          setTimeout(() => update(assoc("beverages", Data.Loaded(beers))), 1000);
        }
      }
    })
  );
