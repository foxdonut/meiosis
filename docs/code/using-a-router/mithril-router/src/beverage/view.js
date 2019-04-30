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
      "div",
      m("div", state.beverage[id]),
      m(
        "div",
        m("a", { href: router.toPath(routing.childRoute([Route.Brewer({ id })])) }, "Brewer")
      ),
      Component && m(Component, { state, actions, routing: routing.next() }),
      m(
        "div",
        m("a", { href: router.toPath(routing.siblingRoute([Route.Beverages()])) }, "Back to list")
      )
    );
  }
};
