import { assoc, dissoc, identity as I } from "ramda";
import { otherwise, run } from "stags";

import { Route, otherRoutes } from "../routes";
import { beverageMap } from "./data";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.beverage ? dissoc("beverage") : I)),
      ...otherwise(["CoffeeDetails", "BeerDetails"])(({ id }) =>
        !state.beverage ? assoc("beverage", beverageMap[id].description) : I
      )
    })
  );
