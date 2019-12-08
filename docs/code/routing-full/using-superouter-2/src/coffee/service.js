import { run } from "stags";

import { coffees } from "../beverage/data";
import { Route, allRoutes } from "../routes";
import { Data, K, expandKeys } from "../util";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: K({ coffees: Data.None(undefined) }),
  "CoffeeDetails, CoffeeBrewer": K(null),
  Coffee: () => (Data.isNone(state.coffees) ? { coffees: Data.Loading() } : null)
});

export const next = ({ state, update }) =>
  run(
    state.route,
    Route.fold(
      expandKeys({
        [allRoutes]: K(null),
        Coffee: () => {
          run(
            state.coffees,
            Data.fold(
              expandKeys({
                "None, Loaded": K(null),
                Loading: () => {
                  setTimeout(() => update({ coffees: Data.Loaded(coffees) }), 1000);
                }
              })
            )
          );
        }
      })
    )
  );
