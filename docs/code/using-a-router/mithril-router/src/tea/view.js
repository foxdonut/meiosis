import m from "mithril";
import { fold } from "static-tagged-union";

import { toPath } from "../router";
import { TeaDetails } from "../teaDetails";
import { Route, childRoute, nextRoute } from "routing-common/src/routes";

export const Tea = {
  view: ({ attrs: { state, actions, route } }) => (
    m("div",
      m("div", "Tea Page"),
      m("ul",
        fold({
          N: () => m("li", "Loading..."),
          Y: teas => teas.map(tea => (
            m("li", { key: tea.id },
              m("a", {
                href: toPath(childRoute(route, [ Route.TeaDetails({ id: tea.id }) ]))
              }, tea.title)
            )
          ))
        })(state.teas)
      ),
      fold({
        TeaDetails: () => m(TeaDetails, { state, actions, route: nextRoute(route) })
      })(route.child)
    )
  )
};
