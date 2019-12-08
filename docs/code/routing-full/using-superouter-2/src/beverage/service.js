import { allRoutes } from "../routes";
import { beverageMap } from "./data";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: () => [
    state.coffee ? { coffee: undefined } : null,
    state.beer ? { beer: undefined } : null
  ],
  CoffeeDetails: ({ id }) => (!state.coffee ? { coffee: beverageMap[id].description } : null),
  BeerDetails: ({ id }) => (!state.beer ? { beer: beverageMap[id].description } : null)
});
