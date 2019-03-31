import m from "mithril";

import { parentRoute } from "routing-common/src/root";
import { toPath } from "../router";

export const TeaDetails = {
  view: ({ attrs: { state, route } }) => (
    m("div",
      m("div", state.tea[route.local.params.id]),
      m("a", { href: toPath(parentRoute(route)) }, "Back to list")
    )
  )
};
