import m from "mithril";

import { Route } from "../routes";
import { router } from "../router";
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
          state.teas.map(tea =>
            m(
              "div",
              { key: tea.id },
              m(
                "a",
                {
                  href: router.toPath(Route.of.TeaDetails({ id: tea.id }))
                },
                tea.title
              )
            )
          )
        ) /*,
        m(
          ".col-md-6",
          routing.childSegment.id === "TeaDetails" &&
            m(TeaDetails, { state, actions })
        )*/
      )
    )
};
