import m from "mithril";

export const Brewer = {
  view: ({ attrs: { state, routing } }) => {
    const id = routing.localSegment.params.id;
    return m("div", state.brewer[id]);
  }
};
