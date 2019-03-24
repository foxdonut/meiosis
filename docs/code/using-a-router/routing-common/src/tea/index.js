import { bifold, contains, map, unless } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { T, Tpipe } from "../util";

export const tea = {
  service: (state, update) =>
    Tpipe(
      state.route,
      contains(Route.Tea()),
      bifold(
        () => T(state.teas, map(() => update({ teas: Loaded.N() }))),
        () => T(state.teas, unless(
          () => setTimeout(() => {
            update({ teas: Loaded.Y(teas) });
          }, 500)
        ))
      )
    )
};
