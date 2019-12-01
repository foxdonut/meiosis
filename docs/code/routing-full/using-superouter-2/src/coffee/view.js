import { Beverages } from "../beverages";
import { Beverage } from "../beverage";
import { Route } from "../routes";
import { K } from "../util";

const componentMap = Route.fold({
  Coffee: K(Beverages),
  CoffeeDetails: K(Beverage),
  CoffeeBrewer: K(Beverage)
});

export const Coffee = ({ state, actions }) => {
  const Component = componentMap(state.route);

  return [
    "div",
    ["div", "Coffee Page"],
    Component({
      state,
      actions,
      beverageRoute: Route.of.CoffeeDetails,
      parentRoute: Route.of.Coffee,
      brewerRoute: Route.of.CoffeeBrewer
    })
  ];
};
