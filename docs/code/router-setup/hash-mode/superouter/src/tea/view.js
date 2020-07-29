import m from "mithril";

import { Route, allRoutes, router } from "../router";
import { TeaDetails } from "../teaDetails";

export const Tea = {
  view: ({ attrs: { state, actions } }) => [
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
              m("a", { href: router.toPath(Route.of.TeaDetails({ id: tea.id })) }, tea.title)
            )
          )
      ),
      Route.fold({
        ...allRoutes(() => null),
        TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, actions }))
      })(state.route)
    )
  ]
};
