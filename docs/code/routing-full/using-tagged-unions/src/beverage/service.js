import { cases, fold } from "static-tagged-union";
import { T } from "ducklings";

import { beverageMap } from "./data";

export const service = ({ state }) =>
  T(state.route)(
    fold(
      cases(["BeerBeverage", "CoffeeBeverage"])(({ id }) => ({
        beverage: beverageMap[id].description
      }))
    )
  );
