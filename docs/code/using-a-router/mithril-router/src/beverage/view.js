import m from "mithril";
import { fold } from "static-tagged-union";

import { Route, childRoute, siblingRoute } from "routing-common/src/root";
import { Brewer } from "../brewer";

const componentMap = fold({
  Brewer: () => Brewer
});

export const Beverage = {
  view: ({ attrs: { state, actions, route } }) => {
    const child = route.params.child;
    const Component = componentMap(child);
    const id = route.params.id;

    return (
      m("div",
        m("div", state.beverage),
        m("div",
          m("a", { href: document.location.hash + "/brewer", // FIXME
            onclick:
              () => actions.navigateTo(
                childRoute(state.route, route, Route.Brewer({ id }))
              )
          }, "Brewer")
        ),
        Component && m(Component, { state, actions, route: child }),
        m("div",
          m("a", { href: "javascript://",
            onclick:
              () => actions.navigateTo(
                siblingRoute(state.route, route, Route.Beverages())
              )
          }, "Back to list")
        )
      )
    );
  }
};
