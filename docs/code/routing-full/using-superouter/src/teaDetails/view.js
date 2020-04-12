import m from "mithril";

export const TeaDetails = {
  view: ({ attrs: { state, id } }) =>
    m("div", m("div", state.tea[id]), m("div", m("a", { href: "#/tea" }, "Close")))
};
