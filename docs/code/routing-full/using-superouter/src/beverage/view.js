import m from "mithril";
import { always as K } from "ramda";

import { router } from "../router";
import { Route } from "../routes";
import { Brewer } from "../brewer";

const componentMap = Route.fold({
  Brewer: K(Brewer)
});

export const Beverage = {
  view: ({ attrs: { state, actions, parentRoute, brewerRoute } }) => {
    const Component = null; // componentMap(state.route);

    return m(
      ".row",
      m(
        ".col-md-6",
        m("div", state.beverage),
        m("div", m("a", { href: router.toPath(parentRoute()) }, "Back to list")),
        !Component &&
          m(
            "div",
            m("a", { href: router.toPath(brewerRoute({ id: state.route.value.id })) }, "Brewer")
          )
      ),
      Component && m(".col-md-6", m(Component, { state, actions }))
    );
  }
};
