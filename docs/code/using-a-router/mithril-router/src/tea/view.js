import m from "mithril";
import { bifold, fold } from "static-tagged-union";

import { TeaDetails } from "../teaDetails";
import { Route, childRoute } from "routing-common/src/root";

export const Tea = {
  view: ({ attrs: { state, actions, route } }) => {
    const child = route.value.child;

    return (
      m("div",
        m("div", "Tea Page"),
        m("ul",
          bifold(
            () => m("li", "Loading..."),
            teas => teas.map(tea => (
              m("li", { key: tea.id },
                m("a", { href: "javascript://",
                  onclick: () =>
                    actions.navigateTo(
                      childRoute(state.route, route, Route.TeaDetails({ id: tea.id }))
                    )
                }, tea.title)
              )
            ))
          )(state.teas)
        ),
        fold({
          TeaDetails: () => m(TeaDetails, { state, actions, route: child })
        })(child)
      )
    );
  }
};
