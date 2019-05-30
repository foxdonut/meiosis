import m from "mithril";

import { Beverages } from "../beverages";
import { Beverage } from "../beverage";

const componentMap = {
  Beverages: Beverages,
  Beverage: Beverage
};

export const Beer = {
  view: ({ attrs: { state, actions, routing } }) => {
    const Component = componentMap[routing.childSegment.id];
    const { type, country } = routing.localSegment.params;

    return m(
      "div",
      m("div", "Beer Page"),
      type ? m("div", "Type: ", type) : null,
      country ? m("div", "Country: ", country) : null,
      m(Component, {
        state,
        actions,
        routing: routing.next(),
        beveragesId: "beers"
      })
    );
  }
};
