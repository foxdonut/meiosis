import { run } from "stags";

import { beers } from "../beverage/data";
import { Route, allRoutes } from "../routes";
import { Data, K, expandKeys } from "../util";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: K({ beers: Data.None(undefined) }),
  "BeerDetails, BeerBrewer": K(null),
  Beer: () => (Data.isNone(state.beers) ? { beers: Data.Loading() } : null)
});

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold(
      expandKeys({
        [allRoutes]: K(null),
        Beer: () => {
          run(
            state.beers,
            Data.fold(
              expandKeys({
                "None, Loaded": K(null),
                Loading: () => {
                  setTimeout(() => update({ beers: Data.Loaded(beers) }), 1000);
                }
              })
            )
          );
        }
      })
    )
  );
