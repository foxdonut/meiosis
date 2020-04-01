import m from "mithril";
import { fold } from "static-tagged-union";
import { T } from "ducklings";

import { router } from "../router";

export const Beverages = {
  view: ({ attrs: { state } }) =>
    T(state.beverages)(
      fold({
        Loaded: ({ beverages }) =>
          m(
            ".row",
            m(
              ".col-md-6",
              beverages.map(beverage =>
                m(
                  "div",
                  { key: beverage.id },
                  m(
                    "a",
                    {
                      href: router.toPath({ id: state.beverageRoute, params: { id: beverage.id } })
                    },
                    beverage.title
                  )
                )
              )
            )
          )
      })
    )
};
