import m from "mithril";

import { toPath } from "../router";
import { TeaDetails } from "../teaDetails";
import { Route, childRoute, nextRoute } from "routing-common/src/routes";

export const Tea = {
  view: ({ attrs: { state, actions, route } }) =>
    m(
      "div",
      m("div", "Tea Page"),
      m(
        "ul",
        state.teas
          ? state.teas.map(tea =>
              m(
                "li",
                { key: tea.id },
                m(
                  "a",
                  {
                    href: toPath(childRoute(route, [Route.TeaDetails({ id: tea.id })]))
                  },
                  tea.title
                )
              )
            )
          : m("li", "Loading...")
      ),

      route.child.id === "TeaDetails" && m(TeaDetails, { state, actions, route: nextRoute(route) })
    )
};
