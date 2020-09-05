import m from "mithril";

import { selectors } from "router-setup-common/src/selectors";

const types = ["Black", "Green", "Herbal", "Oolong"];

export const TeaSearch = () => ({
  view: ({ attrs: { state, update } }) => {
    const teaType = selectors.teaType(state);

    return [
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
                    href: "#!/tea/search",
                    onclick: () => update({ teaType: type })
                  },
                  type
                )
              ]),
              m("a", { href: "#!/tea/search", onclick: () => update({ teaType: null }) }, "All")
            ),
            m(
              "table.table.table-bordered.table-striped",
              m("thead", m("tr", m("th", "Type"), m("th", "Description"))),
              m(
                "tbody",
                state.searchTeas
                  .filter(tea => !teaType || tea.type === teaType)
                  .map(tea => m("tr", { key: tea.id }, m("td", tea.type), m("td", tea.description)))
              )
            )
          ]
        )
      )
    ];
  }
});
