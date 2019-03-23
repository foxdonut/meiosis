import m from "mithril";
import { fold } from "static-tagged-union";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beverages: () => Beverages,
  Beverage: () => Beverage
});

export const Coffee = {
  view: ({ attrs: { state, actions, route } }) => {
    const child = route.params.child;
    const Component = componentMap(child);

    return (
      m("div",
        m("div", "Coffee Page"),
        m(Component, { state, actions, route: child })
      )
    );
  }
};
