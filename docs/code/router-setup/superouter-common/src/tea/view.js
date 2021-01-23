import m from "mithril";

import { PleaseWait } from "router-setup-common/src/ui";
import { Route, allRoutes } from "../router";
import { TeaDetails } from "../teaDetails";

export const Tea = {
  view: ({ attrs: { state, router } }) => [
    m("h3", "Tea Page"),
    m(
      ".row",
      m(
        ".col-md-6",
        state.teas &&
          state.teas.map(tea =>
            m(
              "div",
              { key: tea.id },
              m("a", { href: router.toUrl(Route.of.TeaDetails({ id: tea.id })) }, tea.title)
            )
          )
      ),
      Route.fold({
        ...allRoutes(() => null),
        TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, router }))
      })(state.route.page)
    ),
    m(PleaseWait, { state })
  ]
};
