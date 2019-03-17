import { bifold, fold, map } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded, Route } from "../root";
import { Tpipe, contains } from "../util";

export const tea = {
  service: (state, update) => {
    if (state.arriving) {
      Tpipe(
        state.routeCurrent,
        contains(Route.Tea()),
        bifold(
          () => map(() => update({ teas: Loaded.N() }))(state.teas),
          () => fold({
            N: () => setTimeout(() => {
              update({ arriving: false, teas: Loaded.Y(teas) });
            }, 500)
          })(state.teas)
        )
      );
    }
  }
};
