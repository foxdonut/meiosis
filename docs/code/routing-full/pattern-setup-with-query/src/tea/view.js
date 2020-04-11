import m from "mithril";

export const Tea = {
  view: ({ attrs: { state, actions } }) => [
    m("h3", "Tea Page"),
    m(
      ".row",
      m(
        ".col-md-6",
        state.teas && [
          m(
            "form",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(2, auto)",
                gridGap: "10px",
                marginBottom: "10px"
              }
            },
            m("label", "Type"),
            m(
              "select",
              {
                value: state.filter.type,
                onchange: evt => actions.setTypeFilter(evt.target.value)
              },
              m("option", ""),
              m("option", "Black"),
              m("option", "Green"),
              m("option", "Herbal")
            ),
            m("label", "Description"),
            m("input", {
              value: state.filter.description,
              oninput: evt => actions.setDescriptionFilter(evt.target.value)
            }),
            m(
              "button.btn.btn-default",
              { type: "button", onclick: () => actions.filter(state.filter) },
              "Filter"
            )
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
