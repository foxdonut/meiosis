import m from "mithril";
import { always as K } from "ramda";

import { router } from "../router";
import { Route } from "../routes";
import { Brewer } from "../brewer";

const componentMap = Route.fold({
  Brewer: K(Brewer)
});

export const Beverage = {
  view: ({ attrs: { state, actions, id } }) => {
    const Component = componentMap(state.route);

    return m(
      ".row",
      m(
        ".col-md-6",
        m("div", state.beverage[id]),
        m("div", m("a", { href: router.toPath(Route.Beverages()) }, "Back to list")),
        !Component && m("div", m("a", { href: router.toPath(Route.Brewer()) }, "Brewer"))
      ),
      Component && m(".col-md-6", m(Component, { state, actions }))
    );
  }
};
