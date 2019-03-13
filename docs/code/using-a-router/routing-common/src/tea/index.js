import { map } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { Tpipe, contains } from "../util";

export const tea = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.routeCurrent,
        contains(Route.Tea()),
        map(() => {
          setTimeout(() => {
            update({ arriving: false, teas: Loaded.Y(teas) });
          }, 500);
        })
      );
    }

    Tpipe(
      state.routePrevious,
      contains(Route.Tea()),
      map(() => update({ routePrevious: null, teas: Loaded.N() }))
    );
  }
};
