import m from "mithril";

import { Route, siblingRoute } from "routing-common/src/routes";
import { toPath } from "../router";

export const Beverages = {
  view: ({ attrs: { state, route, beveragesId } }) =>
    state[beveragesId] &&
    m(
      "ul",
      state[beveragesId].map(beverage =>
        m(
          "li",
          { key: beverage.id },
          m(
            "a",
            { href: toPath(siblingRoute(route, [Route.Beverage({ id: beverage.id })])) },
            beverage.title
          )
        )
      )
    )
};
