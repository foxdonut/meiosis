import m from "mithril";
import { fold } from "static-tagged-union";

import { Route, siblingRoute } from "routing-common/src/routes";
import { T } from "routing-common/src/util";
import { toPath } from "../router";

export const Beverages = {
  view: ({ attrs: { state, route, beveragesId } }) =>
    T(
      state[beveragesId],
      fold({
        Y: beverages =>
          m(
            "ul",
            beverages.map(beverage =>
              m(
                "li",
                { key: beverage.id },
                m(
                  "a",
                  { href: toPath(siblingRoute(route, [Route.Beverage({ id: beverage.id })])) },
                  beverage.title
                )
              )
            )
          )
      })
    )
};
