import { bifold, contains, map, unless } from "static-tagged-union";

import { beers } from "../beverage";
import { Arrived, Loaded, Route } from "../root";
import { Tpipe } from "../util";

export const beer = {
  service: (state, update) => {
    unless(({ route }) =>
      Tpipe(
        route,
        contains(Route.Beer()),
        bifold(
          () => map(() => update({ beers: Loaded.N() }))(state.beers),
          () => unless(
            () => {
              update({
                routeCurrent: Arrived.Y({ route }),
                pleaseWait: true
              });

              setTimeout(() => update({
                pleaseWait: false,
                beverages: beers,
                beers: Loaded.Y()
              }), 1000);
            }
          )(state.beers)
        )
      )
    )(state.routeCurrent);
  }
};
