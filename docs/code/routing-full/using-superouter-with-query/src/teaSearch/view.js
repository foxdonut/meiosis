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
                  style: { marginRight: "10px" },
                  href: router.toPath(Route.of.TeaSearch(), { type })
                },
                type
              )
            ]),
            m("a", { href: router.toPath(Route.of.TeaSearch()) }, "All")
          ),
          m(
            "table.table.table-bordered.table-striped",
            m("thead", m("tr", m("th", "Type"), m("th", "Description"))),
            m(
              "tbody",
              state.searchTeas
                .filter(
                  tea =>
                    (!state.route.queryParams.type || tea.type === state.route.queryParams.type) &&
                    (!state.route.queryParams.description ||
                      tea.description.includes(state.route.queryParams.description))
                )
                .map(tea => m("tr", { key: tea.id }, m("td", tea.type), m("td", tea.description)))
            )
          )
        ]
      )
    )
  ]
});
