import m from "mithril";

import { nextRoute } from "routing-common/src/routes";
import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages: Beverages,
  Beverage: Beverage
};

export const Beer = {
  view: ({ attrs: { state, actions, route } }) => {
    const Component = componentMap[route.child.id];

    return m(
      "div",
      m("div", "Beer Page"),
      m(Component, {
        state,
        actions,
        route: nextRoute(route),
        beveragesId: "beers"
      })
    );
  }
};
