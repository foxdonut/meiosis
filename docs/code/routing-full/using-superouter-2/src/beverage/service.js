import { otherwise, run } from "stags";

import { Route, otherRoutes } from "../routes";
import { beverageMap } from "./data";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.beverage ? { beverage: undefined } : null)),
      ...otherwise(["CoffeeDetails", "BeerDetails"])(({ id }) =>
        !state.beverage ? { beverage: beverageMap[id].description } : null
      )
    })
  );
