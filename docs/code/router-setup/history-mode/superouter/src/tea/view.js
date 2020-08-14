import m from "mithril";

import { Route, allRoutes } from "../router";
import { TeaDetails } from "../teaDetails";
import { getLinkAttrs } from "../router/link";

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
              m("a", getLinkAttrs(router, Route.of.TeaDetails({ id: tea.id })), tea.title)
            )
          )
      ),
      Route.fold({
        ...allRoutes(() => null),
        TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, router }))
      })(state.route)
    )
  ]
};
