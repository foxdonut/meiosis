import m from "mithril";

import { selectors } from "../state";

const types = ["Black", "Green", "Herbal", "Oolong"];

export const TeaSearch = () => ({
  view: ({ attrs: { state, router } }) => {
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
                m("a", { style: { marginRight: "10px" }, href: `#!/tea/search?type=${type}` }, type)
              ]),
              m("a", { href: "#!/tea/search" }, "All")
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
