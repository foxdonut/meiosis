import m from "mithril";

// import { router } from "../router";
import { Brewer } from "../brewer";

export const Beverage = {
  view: ({ attrs: { state, actions } }) =>
    m(
      ".row",
      m(
        ".col-md-6",
        m("div", state.beverage),
        m("div", m("a", { href: "#" /* router.toPath("parentRoute") */ }, "Back to list")),
        !state.brewer &&
          m(
            "div",
            m(
              "a",
              { href: "#" /* router.toPath("brewerRoute({ id: state.route.params.id })") */ },
              "Brewer"
            )
          )
      ),
      state.brewer && m(".col-md-6", m(Brewer, { state, actions }))
    )
};
