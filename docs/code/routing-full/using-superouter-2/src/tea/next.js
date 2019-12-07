import { Either, run } from "stags";

import { teas } from "../teaDetails/data";
import { Route, otherRoutes } from "../routes";
import { K } from "../util";

export const next = ({ state, update }) => {
  run(
    state.pendingRoute,
    Either.bifold(
      K(null),
      Route.fold({
        ...otherRoutes(() => update({ pendingRoute: Either.N() })),
        Tea: () => {
          setTimeout(() => {
            update({
              teas: teas,
              route: Route.of.Tea(),
              pendingRoute: Either.N()
            });
          }, 0);
        }
      })
    )
  );
};
