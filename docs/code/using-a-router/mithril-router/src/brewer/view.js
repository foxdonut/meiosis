import m from "mithril";

import { router } from "../router";

export const Brewer = {
  view: ({ attrs: { state, routing } }) => {
    const id = routing.localSegment.params.id;

    return m(
      "div",
      m("div", state.brewer[id]),
      m("div", m("a", { href: router.toPath(routing.parentRoute()) }, "Close"))
    );
  }
};
