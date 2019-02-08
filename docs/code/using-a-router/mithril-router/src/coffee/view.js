import m from "mithril";

import { caseOf } from "routing-common/src/util";
import { toPath } from "../util/router";

export const Coffee = {
  view: ({ attrs: { state } }) => (
    m("div",
      m("p", "Coffee Page"),
      m("ul",
        state.coffees && state.coffees.map(coffee =>
          m("li", { key: coffee.id },
            m("a", {
              href: toPath(caseOf("CoffeeDetails", { id: coffee.id }))
            }, coffee.title)
          )
        )
      ),
      state.coffee
    )
  )
};
