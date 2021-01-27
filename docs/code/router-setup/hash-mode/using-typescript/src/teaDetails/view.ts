import m from "mithril";
import { ViewAttrs } from "../app/types";

import { Route, router } from "../router";

export const TeaDetails: m.Component<ViewAttrs> = {
  view: ({ attrs: { state } }) =>
    m("div", m("div", state.tea), m("div", m("a", { href: router.toUrl(Route.Tea) }, "Close")))
};
