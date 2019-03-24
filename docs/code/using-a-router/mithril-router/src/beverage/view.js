import m from "mithril";
import { fold } from "static-tagged-union";

import { Route, childRoute, siblingRoute, nextRoute } from "routing-common/src/root";
import { toPath } from "../util/router";
import { Brewer } from "../brewer";

const componentMap = fold({
  Brewer: () => Brewer
});

export const Beverage = {
  view: ({ attrs: { state, actions, route } }) => {
    const Component = componentMap(route.child);
    const id = route.local.params.id;

    return (
      m("div",
        m("div", state.beverage),
        m("div",
          m("a",
            { href: toPath(childRoute(route, [ Route.Brewer({ id }) ])) },
            "Brewer")
        ),
        Component && m(Component, { state, actions, route: nextRoute(route) }),
        m("div",
          m("a",
            { href: toPath(siblingRoute(route, [ Route.Beverages() ])) },
            "Back to list")
        )
      )
    );
  }
};
