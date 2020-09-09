import m from "mithril";

import { Route } from "router-setup-common/src/router";
import { getLinkAttrs } from "../router/link";

export const TeaDetails = {
  view: ({ attrs: { state, id, router } }) =>
    m("div", m("div", state.tea[id]), m("div", m("a", getLinkAttrs(router, Route.Tea), "Close")))
};
