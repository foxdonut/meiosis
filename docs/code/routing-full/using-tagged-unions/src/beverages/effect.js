import { fold } from "static-tagged-union";
import { T } from "ducklings";

import { beers, coffees } from "../beverage/data";
import { Data } from "../util";

const beverageTypes = { beers, coffees };
const beverageRoutes = { beers: "BeerBeverage", coffees: "CoffeeBeverage" };

export const effect = ({ state, update }) =>
  T(state.beverages)(
    fold({
      Loading: ({ beverageType }) => {
        setTimeout(
          () =>
            update({
              beverages: Data.Loaded({
                beverages: beverageTypes[beverageType],
                beverageRoute: beverageRoutes[beverageType]
              })
            }),
          1000
        );
      }
    })
  );
