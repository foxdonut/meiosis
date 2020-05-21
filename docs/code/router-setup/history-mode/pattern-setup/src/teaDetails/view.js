import m from "mithril";

import { Link } from "../router/link";

export const TeaDetails = {
  view: ({ attrs: { state, id } }) =>
    m("div", m("div", state.tea[id]), m("div", m(Link, { href: "/tea" }, "Close")))
};
