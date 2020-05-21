import m from "mithril";

import { TeaDetails } from "../teaDetails";
import { Link } from "../router/link";

export const Tea = {
  view: ({ attrs: { state, actions } }) =>
    m(
      "div",
      m("div", "Tea Page"),
      m(
        ".row",
        m(
          ".col-md-6",
          state.teas &&
            state.teas.map(tea =>
              m("div", { key: tea.id }, m(Link, { href: `/tea/${tea.id}` }, tea.title))
            )
        ),
        state.route.page === "TeaDetails" &&
          m(".col-md-6", m(TeaDetails, { state, id: state.route.params.id, actions }))
      )
    )
};
