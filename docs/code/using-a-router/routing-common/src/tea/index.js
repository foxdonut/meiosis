import { bifold, contains, map, unless } from "static-tagged-union";

import { teas } from "../teaDetails";
import { Loaded, Route, routeList } from "../root";
import { Tpipe } from "../util";

export const tea = {
  service: (state, update) => (state.arriving) && (() =>
    Tpipe(
      state.route,
      routeList,
      contains(Route.Tea()),
      bifold(
        () => map(() => update({ teas: Loaded.N() }))(state.teas),
        () => unless(
          () => setTimeout(() => {
            update({
              arriving: false,
              teas: Loaded.Y(teas)
            });
          }, 500)
        )(state.teas)
      )
    )
  )
};
