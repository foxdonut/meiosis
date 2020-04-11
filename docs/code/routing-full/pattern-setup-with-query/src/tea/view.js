import m from "mithril";

export const Tea = () => {
  const model = { type: "", description: "" };

  return {
    view: ({ attrs: { state, actions } }) => [
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
              "form",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(2, auto)",
                  gridGap: "10px",
                  marginBottom: "10px"
                }
              },
              m("label", "Type:"),
              m(
                "select",
                {
                  onchange: evt => {
                    model.type = evt.target.value;
                  }
                },
                m("option", "- Select "),
                ["Black", "Green", "Herbal"].map(type => m("option", { value: type }, type))
              ),
              m("label", "Description:"),
              m("input", {
                type: "text",
                oninput: evt => {
                  model.description = evt.target.value;
                }
              }),
              m(
                "button.btn.btn-default",
                {
                  type: "button",
                  onclick: () => actions.filter(model)
                },
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
                    tea =>
                      (!state.route.queryParams.type ||
                        tea.type === state.route.queryParams.type) &&
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
  };
};
