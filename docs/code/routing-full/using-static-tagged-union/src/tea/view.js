import m from "mithril";
import { fold } from "static-tagged-union";

import { TeaDetails } from "../teaDetails";
import { Route, router } from "../router";

export const Tea = {
  view: ({ attrs: { state, actions } }) =>
    m(
      "div",
      m("div", "Tea Page"),
      m(
        ".row",
        m(
          ".col-md-6",
          state.teas &&
            state.teas.map(tea =>
              m(
                "div",
                { key: tea.id },
                m("a", { href: router.toPath(Route.TeaDetails({ id: tea.id })) }, tea.title)
              )
            )
        ),
        fold({
          TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, actions }))
        })(state.route)
      )
    )
};
