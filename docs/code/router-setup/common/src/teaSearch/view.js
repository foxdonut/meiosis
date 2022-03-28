import m from "mithril";

import { Route } from "../router";
import { PleaseWait } from "../ui";

const types = ["Black", "Green", "Herbal", "Oolong"];

export const TeaSearch = () => ({
  view: ({ attrs: { state, router } }) => {
    const teaType = state.route.params.type;

    return [
      m("h3", "Tea Search Page"),
      m(
        ".row",
        m(
          ".col-md-6",
          state.searchTeas && [
            m(
              "div",
              types.map((type) => [
                m(
                  "a",
                  {
                    style: { marginRight: "10px" },
                    href: router.toUrl(Route.TeaSearch, {
                      type
                    })
                  },
                  type
                )
              ]),
              m(
                "a",
                { href: router.toUrl(Route.TeaSearch) },
                "All"
              )
            ),
            m(
              "table.table.table-bordered.table-striped",
              m(
                "thead",
                m(
                  "tr",
                  m("th", "Type"),
                  m("th", "Description")
                )
              ),
              m(
                "tbody",
                state.searchTeas
                  .filter(
                    (tea) =>
                      !teaType || tea.type === teaType
                  )
                  .map((tea) =>
                    m(
                      "tr",
                      { key: tea.id },
                      m("td", tea.type),
                      m("td", tea.description)
                    )
                  )
              )
            )
          ]
        )
      ),
      m(PleaseWait, { state })
    ];
  }
});
