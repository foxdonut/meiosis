import m from "mithril";
import { fold } from "static-tagged-union";
import { K } from "ducklings";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beer: K(Beverages),
  BeerBeverage: K(Beverage),
  BeerBrewer: K(Beverage)
});

export const Beer = {
  view: ({ attrs: { state, actions } }) => {
    const Component = componentMap(state.route);

    return m("div", m("div", "Beer Page"), m(Component, { state, actions }));
  }
};
