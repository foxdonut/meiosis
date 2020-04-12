import m from "mithril";

export const Home = {
  view: ({ attrs: { state } }) =>
    m("div", m("div", "Home Page"), state.user && m("div", "You are logged in as: ", state.user))
};
