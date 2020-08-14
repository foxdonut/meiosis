import m from "mithril";

import { Route } from "../router";

export const TeaDetails = {
  view: ({ attrs: { state, id, router } }) =>
    m(
      "div",
      m("div", state.tea[id]),
      m("div", m("a", { href: router.toUrl(Route.of.Tea()) }, "Close"))
    )
};
