import m from "mithril";
import { fold } from "static-tagged-union";

import { Route, childRoute, siblingRoute, nextRoute } from "routing-common/src/routes";
import { toPath } from "../router";
import { Brewer } from "../brewer";

const componentMap = fold({
  Brewer: () => Brewer
});

export const Beverage = {
  view: ({ attrs: { state, update, route } }) => {
    const Component = componentMap(route.child);
    const id = route.local.params.id;

    return (
      m("div",
        m("div", state.beverage[id]),
        m("div",
          m("a",
            { href: toPath(childRoute(route, [ Route.Brewer({ id }) ])) },
            "Brewer")
        ),
        Component && m(Component, { state, update, route: nextRoute(route) }),
        m("div",
          m("a",
            { href: toPath(siblingRoute(route, [ Route.Beverages() ])) },
            "Back to list")
        )
      )
    );
  }
};
