import { bifold, contains, map, unless } from "static-tagged-union";

import { coffees } from "../beverage";
import { Loaded, Route } from "../root";
import { Tpipe } from "../util";

export const coffee = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.routeCurrent,
        contains(Route.Coffee()),
        bifold(
          () => map(() => update({ coffees: Loaded.N() }))(state.coffees),
          () => unless(
            () => {
              update({
                arriving: false,
                pleaseWait: true
              });

              setTimeout(() => update({
                pleaseWait: false,
                beverages: coffees,
                coffees: Loaded.Y()
              }), 1000);
            }
          )(state.coffees)
        )
      );
    }
  }
};
