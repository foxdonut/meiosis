import { contains, fold } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { T, Tpipe } from "../util";

export const tea = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Tea()),
      fold({
        Y: () => T(state.teas, fold({
          N: () => setTimeout(() => {
            update({ teas: Loaded.Y(teas) });
          }, 500)
        })),
        N: () => T(state.teas, fold({
          Y: (() => update({ teas: Loaded.N() }))
        })),
      })
    )
};
