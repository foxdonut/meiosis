import m from "mithril";
import { fold } from "static-tagged-union";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beverages: () => Beverages,
  Beverage: () => Beverage
});

export const Beer = {
  view: ({ attrs: { state, actions, route } }) => {
    const child = route.value.child;
    const Component = componentMap(child);

    return (
      m("div",
        m("div", "Beer Page"),
        m(Component, { state, actions, route: child })
      )
    );
  }
};
