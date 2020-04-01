import m from "mithril";
import { fold } from "static-tagged-union";
import { K } from "ducklings";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Coffee: K(Beverages),
  CoffeeBeverage: K(Beverage),
  CoffeeBrewer: K(Beverage)
});

export const Coffee = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap(state.route);

    return m("div", m("div", "Coffee Page"), m(Component, { state, actions }));
  }
};
