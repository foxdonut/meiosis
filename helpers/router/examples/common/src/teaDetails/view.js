import m from "mithril";

import { Route } from "../router";

export const TeaDetails = {
  view: ({ attrs: { state, router } }) =>
    m(
      "div",
      m("div", state.tea),
      m(
        "div",
        m("a", { href: router.toUrl(Route.Tea) }, "Close")
      )
    )
};
