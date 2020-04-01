import m from "mithril";

import { router } from "../router";

export const Brewer = {
  view: ({ attrs: { state, parentRoute } }) =>
    m(
      "div",
      m("div", state.brewer),
      m("div", m("a", { href: router.toPath(parentRoute({ id: state.route.value.id })) }, "Close"))
    )
};
