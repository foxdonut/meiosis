import m from "mithril";

import { TeaDetails } from "../teaDetails";
import { PleaseWait } from "router-setup-common/src/ui";
import { ViewAttrs } from "../app/types";
import { Route, router } from "../router";

export const Tea: m.Component<ViewAttrs> = {
  view: ({ attrs: { state, update, actions } }) => [
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
              m("a", { href: router.toUrl(Route.TeaDetails, { id: tea.id }) }, tea.title)
            )
          )
      ),
      state.route.page === "TeaDetails" && m(".col-md-6", m(TeaDetails, { state, update, actions }))
    ),
    m(PleaseWait, { state })
  ]
};
