import m from "mithril";
import { fold } from "static-tagged-union";

import { nextRoute } from "routing-common/src/routes";
import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = fold({
  Beverages: () => Beverages,
  Beverage: () => Beverage
});

export const Beer = {
  view: ({ attrs: { state, update, route } }) => {
    const Component = componentMap(route.child);

    return (
      m("div",
        m("div", "Beer Page"),
        m(Component, {
          state, update, route: nextRoute(route), beveragesId: "beers"
        })
      )
    );
  }
};
