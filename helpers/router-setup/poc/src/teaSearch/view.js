import m from "mithril";

const types = ["Black", "Green", "Herbal", "Oolong"];

export const TeaSearch = () => ({
  view: ({ attrs: { state, update } }) => [
    m("h3", "Tea Search Page"),
    state.searchTeas && [
      m(
        "div",
        types.map(type => [
          m(
            "a",
            {
              style: { marginRight: "10px" },
              href: "javascript://",
              onclick: () => update({ teaType: type })
            },
            type
          )
        ]),
        m("a", { href: "javascript://", onclick: () => update({ teaType: null }) }, "All")
      ),
      m(
        "table",
        m("thead", m("tr", m("th", "Type"), m("th", "Description"))),
        m(
          "tbody",
          state.searchTeas
            .filter(tea => !state.teaType || tea.type === state.teaType)
            .map(tea => m("tr", { key: tea.id }, m("td", tea.type), m("td", tea.description)))
        )
      )
    ]
  ]
});
