import m from "mithril";

import { router } from "../router";

export const TeaDetails = {
  view: ({ attrs: { state, routing } }) =>
    m(
      "div",
      m("div", state.tea[routing.localSegment.params.id]),
      m("div", m("a", { href: router.toPath(routing.parentRoute()) }, "Close"))
    )
};
