import { Beverages } from "../beverages";
import { Beverage } from "../beverage";
import { Route } from "../routes";
import { K } from "../util";

const componentMap = Route.fold({
  Beer: K(Beverages),
  BeerDetails: K(Beverage),
  BeerBrewer: K(Beverage)
});

export const Beer = ({ state, actions }) => {
  const Component = componentMap(state.route);

  return [
    "div",
    ["div", "Beer Page"],
    Component({
      state,
      actions,
      list: "beers",
      single: "beer",
      beverageRoute: Route.of.BeerDetails,
      parentRoute: Route.of.Beer,
      brewerRoute: Route.of.BeerBrewer
    })
  ];
};
