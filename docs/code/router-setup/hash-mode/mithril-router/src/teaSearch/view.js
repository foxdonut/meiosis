import m from "mithril";

import { Route, router } from "../router";

const types = ["Black", "Green", "Herbal", "Oolong"];

export const TeaSearch = () => ({
  view: ({ attrs: { state } }) => [
    m("h3", "Tea Search Page"),
    m(
      ".row",
      m(
        ".col-md-6",
        state.searchTeas && [
          m(
            "div",
            types.map(type => [
              m(
                "a",
                {
                  href: router.toUrl(Route.TeaSearch, { queryParams: { type } }),
                  style: { marginRight: "10px" }
                },
                type
              )
            ]),
            m("a", { href: router.toUrl(Route.TeaSearch) }, "All")
          ),
          m(
            "table.table.table-bordered.table-striped",
            m("thead", m("tr", m("th", "Type"), m("th", "Description"))),
            m(
              "tbody",
              state.searchTeas
                .filter(
                  tea =>
                    (!state.route.params.type || tea.type === state.route.params.type) &&
                    (!state.route.params.description ||
                      tea.description.includes(state.route.params.description))
                )
                .map(tea => m("tr", { key: tea.id }, m("td", tea.type), m("td", tea.description)))
            )
          )
        ]
      )
    )
  ]
});
