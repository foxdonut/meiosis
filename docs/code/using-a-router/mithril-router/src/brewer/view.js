import m from "mithril";

export const Brewer = {
  view: ({ attrs: { state, route } }) => {
    const id = route.local.params.id;
    return m("div", state.brewer[id]);
  }
};
