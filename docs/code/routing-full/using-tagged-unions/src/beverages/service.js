import { cases, fold } from "static-tagged-union";
import { K, T } from "ducklings";

import { Data } from "../util";

export const service = ({ state }) =>
  T(state.route)(
    fold({
      ...cases(["Beer", "BeerBeverage", "BeerBrewer"])(() =>
        T(state.beverages)(
          fold({
            None: () => ({
              beverages: Data.Loading({ beverageType: "beers" })
            }),
            Loaded: ({ beverageType }) =>
              beverageType !== "beers" && {
                beverages: Data.Loading({ beverageType: "beers" })
              }
          })
        )
      ),
      ...cases(["Coffee", "CoffeeBeverage", "CoffeeBrewer"])(() =>
        T(state.beverages)(
          fold({
            None: () => ({
              beverages: Data.Loading({ beverageType: "coffees" })
            }),
            Loaded: ({ beverageType }) =>
              beverageType !== "coffees" && {
                beverages: Data.Loading({ beverageType: "coffees" })
              }
          })
        )
      ),
      _: () => ({ beverages: Data.None(K({})) })
    })
  );
