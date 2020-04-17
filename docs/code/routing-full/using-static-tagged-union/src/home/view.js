import m from "mithril";
import { fold } from "static-tagged-union";

export const Home = {
  view: ({ attrs: { state } }) =>
    m(
      "div",
      m("div", "Home Page"),
      state.user && m("div", "You are logged in as: ", state.user),
      fold({
        Home: ({ queryParams }) => queryParams.message && m("div", queryParams.message)
      })(state.route)
    )
};
