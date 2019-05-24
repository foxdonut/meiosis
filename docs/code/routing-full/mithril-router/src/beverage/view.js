import m from "mithril";

import { Route } from "routing-common/src/routes";
import { router } from "../router";
import { Brewer } from "../brewer";

const componentMap = {
  Brewer
};

export const Beverage = {
  view: ({ attrs: { state, actions, routing } }) => {
    const Component = componentMap[routing.childSegment.id];
    const id = routing.localSegment.params.id;

    return m(
      ".row",
      m(
        ".col-md-6",
        m("div", state.beverage[id]),
        m(
          "div",
          m("a", { href: router.toPath(routing.siblingRoute(Route.Beverages())) }, "Back to list")
        ),
        !Component &&
          m("div", m("a", { href: router.toPath(routing.childRoute(Route.Brewer())) }, "Brewer"))
      ),
      Component && m(".col-md-6", m(Component, { state, actions, routing: routing.next() }))
    );
  }
};
