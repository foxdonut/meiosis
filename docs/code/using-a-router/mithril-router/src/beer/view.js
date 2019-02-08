import m from "mithril";

import { caseOf } from "routing-common/src/util";
import { toPath } from "../util/router";

const BeerBrewer = {
  view: ({ attrs: { state } }) => m("p", state.brewer)
};

const beerDetailsComponentMap = {
  BeerBrewer
};

const BeerDetails = {
  view: ({ attrs: { state, actions } }) => {
    const Component = beerDetailsComponentMap[state.routeCurrent.case];

    return (
      m("div",
        m("p", state.beer),
        (Component && m(Component, { state, actions }) ||
          m("a", {
            href: toPath(caseOf("BeerBrewer", { id: state.routeCurrent.value.id }))
          }, "Brewer")
        )
      )
    );
  }
};

const beerComponentMap = {
  BeerDetails,
  BeerBrewer: BeerDetails
};

export const Beer = {
  view: ({ attrs: { state, actions } }) => {
    const Component = beerComponentMap[state.routeCurrent.case];

    return (
      m("div",
        m("p", "Beer Page"),
        m("ul",
          state.beers.map(beer =>
            m("li", { key: beer.id },
              m("a", {
                href: toPath(caseOf("BeerDetails", { id: beer.id }))
              }, beer.title)
            )
          )
        ),
        (Component && m(Component, { state, actions }))
      )
    );
  }
};
