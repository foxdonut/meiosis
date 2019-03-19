import { bifold, contains, map, unless } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Arrived, Loaded, Route } from "../root";
import { Tpipe } from "../util";

export const tea = {
  service: (state, update) => {
    unless(({ route }) =>
      Tpipe(
        route,
        contains(Route.Tea()),
        bifold(
          () => map(() => update({ teas: Loaded.N() }))(state.teas),
          () => unless(
            () => setTimeout(() => {
              update({
                routeCurrent: Arrived.Y({ route }),
                teas: Loaded.Y(teas)
              });
            }, 500)
          )(state.teas)
        )
      )
    )(state.routeCurrent);
  }
};
