import m from "mithril";
import { fold } from "static-tagged-union";

import { nextRoute } from "routing-common/src/root";
import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beverages: () => Beverages,
  Beverage: () => Beverage
});

export const Coffee = {
  view: ({ attrs: { state, actions, route } }) => {
    const Component = componentMap(route.child);

    return (
      m("div",
        m("div", "Coffee Page"),
        m(Component, {
          state, actions, route: nextRoute(route), beveragesId: "coffees"
        })
      )
    );
  }
};
