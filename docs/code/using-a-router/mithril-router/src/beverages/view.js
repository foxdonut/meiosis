import m from "mithril";

import { Route, siblingRoute } from "routing-common/src/root";

export const Beverages = {
  view: ({ attrs: { state, actions, route } }) => (
    m("ul",
      state.beverages.map(beverage =>
        m("li", { key: beverage.id },
          m("a", { href: document.location.hash + "/" + beverage.id, // FIXME
            onclick:
              () => actions.navigateTo(
                siblingRoute(route, [ Route.Beverage({ id: beverage.id }) ])
              )
          }, beverage.title)
        )
      )
    )
  )
};
