import m from "mithril";

import { Route, allRoutes } from "../router";
import { TeaDetails } from "../teaDetails";

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
                m(
                  "a",
                  {
                    href: `#/tea/${tea.id}`
                  },
                  tea.title
                )
              )
            )
        ),
        Route.fold({
          ...allRoutes(() => null),
          TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, actions }))
        })(state.route)
      )
    )
};
