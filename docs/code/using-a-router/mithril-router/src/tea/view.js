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
        "ul",
        state.teas
          ? state.teas.map(tea =>
              m(
                "li",
                { key: tea.id },
                m(
                  "a",
                  {
                    href: router.toPath(routing.childRoute([Route.TeaDetails({ id: tea.id })]))
                  },
                  tea.title
                )
              )
            )
          : m("li", "Loading...")
      ),

      routing.childSegment.id === "TeaDetails" &&
        m(TeaDetails, { state, actions, routing: routing.next() })
    )
};
