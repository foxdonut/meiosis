import m from "mithril";

import { router } from "../router";

export const Brewer = {
  view: ({ attrs: { state } }) =>
    m(
      "div",
      m("div", state.brewer.description),
      m("div", m("a", { href: router.toPath(state.brewer.parentRoute) }, "Close"))
    )
};
