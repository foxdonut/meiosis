import m from "mithril";
import { T } from "ducklings";
import { fold } from "static-tagged-union";

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
          T(state.teas)(
            fold({
              Loaded: ({ teas }) =>
                teas.map(tea =>
                  m(
                    "div",
                    { key: tea.id },
                    m(
                      "a",
                      {
                        href: router.toPath(Route.TeaDetails({ id: tea.id }))
                      },
                      tea.title
                    )
                  )
                )
            })
          )
        ),
        T(state.route)(
          fold({
            TeaDetails: ({ id }) => m(".col-md-6", m(TeaDetails, { state, id, actions }))
          })
        )
      )
    )
};
