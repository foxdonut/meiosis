import m from "mithril";
import { ViewAttrs } from "../app/types";

export const Home: m.Component<ViewAttrs> = {
  view: ({ attrs: { state } }) => [
    m("h3", "Home Page"),
    state.user &&
      m("div", "You are logged in as: ", state.user),
    state.message && m("div", state.message)
  ]
};
