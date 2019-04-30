import m from "mithril";

import { router } from "../router";

export const TeaDetails = {
  view: ({ attrs: { state, routing } }) =>
    m(
      "div",
      m("div", state.tea[routing.localSegment.params.id]),
      m("a", { href: router.toPath(routing.parentRoute()) }, "Back to list")
    )
};
