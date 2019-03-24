import m from "mithril";

import { parentRoute } from "routing-common/src/root";
import { toPath } from "../util/router";

export const TeaDetails = {
  view: ({ attrs: { state, route } }) => (
    m("div",
      m("div", state.tea),
      m("a", { href: toPath(parentRoute(route)) }, "Back to list")
    )
  )
};
