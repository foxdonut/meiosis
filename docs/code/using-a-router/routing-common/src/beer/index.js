import { bifold, contains, map, unless } from "static-tagged-union";

import { beers } from "../beverage";
import { Loaded, Route } from "../root";
import { T, Tpipe } from "../util";

export const beer = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Beer()),
      bifold(
        () => T(state.beers, map(() => update({ beers: Loaded.N() }))),
        () => T(state.beers, unless(
          () => {
            if (!state.pleaseWait) {
              update({ pleaseWait: true });
            }

            setTimeout(() => update({
              pleaseWait: false,
              beverages: beers,
              beers: Loaded.Y()
            }), 1000);
          }
        ))
      )
    )
};
