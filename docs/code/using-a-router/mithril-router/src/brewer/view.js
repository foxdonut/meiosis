import m from "mithril";

export const Brewer = {
  view: ({ attrs: { state } }) => (
    m("div", state.brewer)
  )
};
