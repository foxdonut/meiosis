import m from "mithril";

export const Tea = {
  view: ({ attrs: { state } }) => [
    m("h3", "Tea Page"),
    m(
      ".row",
      m(
        ".col-md-6",
        state.teas && [
          m(
            "div",
            ["Black", "Green", "Herbal"].map(type => [
              m(
                "a",
                {
                  style: { marginRight: "10px" },
                  href: `#/tea?type=${type}`
                },
                type
              )
            ]),
            m("a", { href: "#/tea" }, "All")
          ),
          m(
            "table.table.table-bordered.table-striped",
            m("thead", m("tr", m("th", "Type"), m("th", "Description"))),
            m(
              "tbody",
              state.teas
                .filter(
                  tea => !state.route.queryParams.type || tea.type === state.route.queryParams.type
                )
                .map(tea => m("tr", { key: tea.id }, m("td", tea.type), m("td", tea.description)))
            )
          )
        ]
      )
    )
  ]
};
