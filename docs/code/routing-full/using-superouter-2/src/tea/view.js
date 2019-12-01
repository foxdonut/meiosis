import m from "mithril";
import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { router } from "../router";
import { TeaDetails } from "../teaDetails";
import { K } from "../util";

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
        ),
        run(
          state.route,
          Route.fold({
            ...otherRoutes(K(null)),
            TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, actions }))
          })
        )
      )
    )
};
