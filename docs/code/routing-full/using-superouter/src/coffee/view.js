import m from "mithril";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages: Beverages,
  Beverage: Beverage
};

export const Coffee = {
  view: ({ attrs: { state, actions, routing } }) => {
    const Component = componentMap[routing.childSegment.id];

    return m(
      "div",
      m("div", "Coffee Page"),
      m(Component, {
        state,
        actions,
        routing: routing.next(),
        beveragesId: "coffees"
      })
    );
  }
};
