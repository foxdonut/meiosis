import m from "mithril";

import { TeaDetails } from "../teaDetails";
import { Route } from "../router";
import { PleaseWait } from "../ui";

export const Tea = {
  view: ({ attrs: { state, router } }) => [
    m("h3", "Tea Page"),
    m(
      ".row",
      m(
        ".col-md-6",
        state.teas &&
          state.teas.map((tea) =>
            m(
              "div",
              { key: tea.id },
              m(
                "a",
                {
                  href: router.toUrl(Route.TeaDetails, {
                    id: tea.id
                  })
                },
                tea.title
              )
            )
          )
      ),
      state.route.page === "TeaDetails" &&
        m(".col-md-6", m(TeaDetails, { state, router }))
    ),
    m(PleaseWait, { state })
  ]
};
