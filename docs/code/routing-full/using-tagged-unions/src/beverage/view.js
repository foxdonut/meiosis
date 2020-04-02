import m from "mithril";
import { cases, fold } from "static-tagged-union";
import { K, T } from "ducklings";

import { router } from "../router";
import { Brewer } from "../brewer";

export const Beverage = {
  view: ({ attrs: { state, actions } }) =>
    m(
      ".row",
      m(
        ".col-md-6",
        m("div", state.beverage.description),
        m("div", m("a", { href: router.toPath(state.beverage.parentRoute) }, "Back to list")),
        T(state.route)(
          fold(
            cases(["CoffeeBeverage", "BeerBeverage"])(
              K(m("div", m("a", { href: router.toPath(state.beverage.brewerRoute) }, "Brewer")))
            )
          )
        )
      ),
      T(state.route)(
        fold(
          cases(["CoffeeBrewer", "BeerBrewer"])(K(m(".col-md-6", m(Brewer, { state, actions }))))
        )
      )
    )
};
