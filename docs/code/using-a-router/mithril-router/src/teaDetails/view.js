import m from "mithril";

import { parentRoute } from "routing-common/src/root";

export const TeaDetails = {
  view: ({ attrs: { state, actions, route } }) => (
    m("div",
      m("div", state.tea),
      m("a", { href: "javascript://",
        onclick: () => actions.navigateTo(parentRoute(route))
      }, "Back to list")
    )
  )
};
