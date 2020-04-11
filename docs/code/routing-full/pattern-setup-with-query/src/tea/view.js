import m from "mithril";

const types = ["Black", "Green", "Herbal", "Oolong"];

export const Tea = () => {
  const model = { type: "", description: "" };

  return {
    oninit: ({ attrs: { state } }) => {
      model.type = state.route.queryParams.type;
      model.description = state.route.queryParams.description;
    },
    view: ({ attrs: { state, actions } }) => [
      m("h3", "Tea Page"),
      m(
        ".row",
        m(
          ".col-md-6",
          state.teas && [
            m(
              "div",
              types.map(type => [
                m(
                  "a",
                  {
                    style: { marginRight: "10px" },
                    href: `#/tea?type=${type}`,
                    onclick: () => {
                      model.type = type;
                      model.description = "";
                    }
                  },
                  type
                )
              ]),
              m(
                "a",
                {
                  href: "#/tea",
                  onclick: () => {
                    model.type = "";
                    model.description = "";
                  }
                },
                "All"
              )
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
                  value: model.type,
                  onchange: evt => {
                    model.type = evt.target.value;
                  }
                },
                m("option", { value: "" }, "- Select -"),
                types.map(type => m("option", { value: type }, type))
              ),
              m("label", "Description:"),
              m("input", {
                type: "text",
                placeholder: "Enter a description",
                value: model.description,
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
