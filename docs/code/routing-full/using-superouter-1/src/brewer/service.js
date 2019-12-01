import { assoc, dissoc, identity as I } from "ramda";
import { otherwise, run } from "stags";

import { Route, otherRoutes } from "../routes";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.brewer ? dissoc("brewer") : I)),
      ...otherwise(["CoffeeBrewer", "BeerBrewer"])(({ id }) =>
        !state.brewer ? assoc("brewer", `Brewer of beverage ${id}`) : I
      )
    })
  );
