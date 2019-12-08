import { allRoutes } from "../routes";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: () => (state.brewer ? { brewer: undefined } : null),
  "CoffeeBrewer, BeerBrewer": ({ id }) =>
    !state.brewer ? { brewer: `Brewer of beverage ${id}` } : null
});
