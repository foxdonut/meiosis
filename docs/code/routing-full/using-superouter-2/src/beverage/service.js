import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { beverageMap } from "./data";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => [
        state.coffee ? { coffee: undefined } : null,
        state.beer ? { beer: undefined } : null
      ]),
      CoffeeDetails: ({ id }) => (!state.coffee ? { coffee: beverageMap[id].description } : null),
      BeerDetails: ({ id }) => (!state.beer ? { beer: beverageMap[id].description } : null)
    })
  );
