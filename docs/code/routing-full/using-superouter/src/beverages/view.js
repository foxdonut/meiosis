import m from "mithril";

import { Route } from "../routes";
// import { router } from "../router";

export const Beverages = {
  view: ({ attrs: { state, routing, beveragesId } }) =>
    state[beveragesId] &&
    m(
      ".row",
      m(
        ".col-md-6",
        state[beveragesId].map(beverage =>
          m(
            "div",
            { key: beverage.id },
            m(
              "a",
              { href: Route.toURL(routing.siblingRoute(Route.Beverage({ id: beverage.id }))) },
              beverage.title
            )
          )
        )
      )
    )
};
