import m from "mithril";

import { router } from "../router";
import { TeaDetails } from "../teaDetails";
import { Route } from "routing-common/src/routes";

export const Tea = {
  view: ({ attrs: { state, actions, routing } }) =>
    m(
      "div",
      m("div", "Tea Page"),
      m(
        ".row",
        m(
          ".col-md-6",
          state.teas
            ? state.teas.map(tea =>
                m(
                  "div",
                  { key: tea.id },
                  m(
                    "a",
                    { href: router.toPath(routing.childRoute(Route.TeaDetails({ id: tea.id }))) },
                    tea.title
                  )
                )
              )
            : m("div", "Loading...")
        ),
        m(
          ".col-md-6",
          routing.childSegment.id === "TeaDetails" &&
            m(TeaDetails, { state, actions, routing: routing.next() })
        )
      )
    )
};
