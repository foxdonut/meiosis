import { bifold, fold, map } from "static-tagged-union";

import { beers } from "../beverage";
import { Loaded, Route } from "../root";
import { Tpipe, contains } from "../util";

export const beer = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.routeCurrent,
        contains(Route.Beer()),
        bifold(
          () => map(() => update({ beers: Loaded.N() }))(state.beers),
          () => fold({
            N: () => {
              update({
                arriving: false,
                pleaseWait: true
              });

              setTimeout(() => update({
                pleaseWait: false,
                beverages: beers,
                beers: Loaded.Y()
              }), 1000);
            }
          })(state.beers)
        )
      );
    }
  }
};
