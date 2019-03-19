import { bifold, contains, map, unless } from "static-tagged-union";

import { beers } from "../beverage";
import { Loaded, Route, routeList } from "../root";
import { Tpipe } from "../util";

export const beer = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.route,
        routeList,
        contains(Route.Beer()),
        bifold(
          () => map(() => update({ beers: Loaded.N() }))(state.beers),
          () => unless(
            () => {
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
          )(state.beers)
        )
      );
    }
  }
};
