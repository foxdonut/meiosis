import m from "mithril";
import { run } from "stags";

import { router } from "../router";
import { Data } from "../util";

export const Beverages = {
  view: ({ attrs: { state, beverageRoute } }) =>
    run(
      state.beverages,
      Data.getLoadedWith(null, beverages =>
        m(
          ".row",
          m(
            ".col-md-6",
            beverages.map(beverage =>
              m(
                "div",
                { key: beverage.id },
                m("a", { href: router.toPath(beverageRoute({ id: beverage.id })) }, beverage.title)
              )
            )
          )
        )
      )
    )
};
