import { cases, fold } from "static-tagged-union";
import { K, T } from "ducklings";

import { Route } from "../routes";

export const service = ({ state }) => [
  T(state.route)(
    fold(
      cases(["BeerBrewer", "CoffeeBrewer"])(({ id }) => ({
        brewer: {
          description: `Brewer of beverage ${id}`
        }
      }))
    )
  ),
  T(state.route)(
    fold({
      CoffeeBrewer: ({ id }) => ({
        brewer: {
          parentRoute: Route.CoffeeBeverage({ id })
        }
      }),
      BeerBrewer: ({ id }) => ({
        brewer: {
          parentRoute: Route.BeerBeverage({ id })
        }
      }),
      _: K({ brewer: undefined })
    })
  )
];
