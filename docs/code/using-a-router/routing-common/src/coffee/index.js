import { bifold, contains, map, unless } from "static-tagged-union";

import { coffees } from "../beverage";
import { Arrived, Loaded, Route } from "../root";
import { Tpipe } from "../util";

export const coffee = {
  service: (state, update) => {
    unless(({ route }) =>
      Tpipe(
        route,
        contains(Route.Coffee()),
        bifold(
          () => map(() => update({ coffees: Loaded.N() }))(state.coffees),
          () => unless(
            () => {
              update({
                routeCurrent: Arrived.Y({ route }),
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
      )
    )(state.routeCurrent);
  }
};
