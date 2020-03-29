import m from "mithril";

import { router } from "../router";
import { Route } from "../routes";

export const TeaDetails = {
  view: ({ attrs: { state, id } }) =>
    m(
      "div",
      m("div", state.tea[id]),
      m("div", m("a", { href: router.toPath(Route.Tea()) }, "Close"))
    )
};
