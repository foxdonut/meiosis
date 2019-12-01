import { otherwise, run } from "stags";

import { Route, otherRoutes } from "../routes";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.brewer ? { brewer: undefined } : null)),
      ...otherwise(["CoffeeBrewer", "BeerBrewer"])(({ id }) =>
        !state.brewer ? { brewer: `Brewer of beverage ${id}` } : null
      )
    })
  );
