import m from "mithril";

import { router } from "../router";

export const TeaDetails = {
  view: ({ attrs: { state, id } }) =>
    m("div", m("div", state.tea[id]), m("div", m("a", router.getHref("/tea"), "Close")))
};
