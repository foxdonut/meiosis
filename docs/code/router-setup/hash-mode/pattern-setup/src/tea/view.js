import m from "mithril";

import { TeaDetails } from "../teaDetails";
import { selectors } from "../state";

export const Tea = {
  view: ({ attrs: { state, actions } }) =>
    m(
      "div",
      m("h3", "Tea Page"),
      m(
        ".row",
        m(
          ".col-md-6",
          state.teas &&
            state.teas.map(tea =>
              m("div", { key: tea.id }, m("a", { href: `#!/tea/${tea.id}` }, tea.title))
            )
        ),
        selectors.page(state) === "TeaDetails" &&
          m(".col-md-6", m(TeaDetails, { state, id: selectors.params(state).id, actions }))
      )
    )
};
