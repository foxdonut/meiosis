import m from "mithril";
import { always as K } from "ramda";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";
import { Route } from "../routes";

const componentMap = Route.fold({
  Coffee: K(Beverages),
  CoffeeDetails: K(Beverage),
  CoffeeBrewer: K(Beverage)
});

export const Coffee = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap(state.route);

    return m(
      "div",
      m("div", "Coffee Page"),
      m(Component, {
        state,
        actions,
        beverageRoute: Route.of.CoffeeDetails,
        parentRoute: Route.of.Coffee,
        brewerRoute: Route.of.CoffeeBrewer
      })
    );
  }
};
