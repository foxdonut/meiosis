import m from "mithril";

import { Route } from "../router";
import { Link } from "../router/link";

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
                Link,
                {
                  page: Route.TeaSearch,
                  params: { queryParams: { type } },
                  style: { marginRight: "10px" }
                },
                type
              )
            ]),
            m(Link, { page: Route.TeaSearch }, "All")
          ),
          m(
            "table.table.table-bordered.table-striped",
            m("thead", m("tr", m("th", "Type"), m("th", "Description"))),
            m(
              "tbody",
              state.searchTeas
                .filter(
                  tea =>
                    !state.route.params.queryParams.type ||
                    tea.type === state.route.params.queryParams.type
                )
                .map(tea => m("tr", { key: tea.id }, m("td", tea.type), m("td", tea.description)))
            )
          )
        ]
      )
    )
  ]
});
