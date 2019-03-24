import m from "mithril";

import { Route, siblingRoute } from "routing-common/src/root";
import { toPath } from "../util/router";

export const Beverages = {
  view: ({ attrs: { state, route } }) => (
    m("ul",
      state.beverages.map(beverage =>
        m("li", { key: beverage.id },
          m("a",
            { href: toPath(siblingRoute(route, [ Route.Beverage({ id: beverage.id }) ])) },
            beverage.title)
        )
      )
    )
  )
};
