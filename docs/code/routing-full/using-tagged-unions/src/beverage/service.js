import { cases, fold } from "static-tagged-union";
import { K, T } from "ducklings";

import { Route } from "../routes";
import { beverageMap } from "./data";

export const service = ({ state }) => [
  T(state.route)(
    fold(
      cases(["CoffeeBeverage", "CoffeeBrewer", "BeerBeverage", "BeerBrewer"])(({ id }) => ({
        beverage: {
          description: beverageMap[id].description
        }
      }))
    )
  ),
  T(state.route)(
    fold({
      ...cases(["CoffeeBeverage", "CoffeeBrewer"])(({ id }) => ({
        beverage: {
          parentRoute: Route.Coffee(),
          brewerRoute: Route.CoffeeBrewer({ id })
        }
      })),
      ...cases(["BeerBeverage", "BeerBrewer"])(({ id }) => ({
        beverage: {
          parentRoute: Route.Beer(),
          brewerRoute: Route.BeerBrewer({ id })
        }
      })),
      _: K({ beverage: undefined })
    })
  )
];
