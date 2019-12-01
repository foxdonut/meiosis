import { Either, run } from "stags";

import { Route, otherRoutes } from "../routes";
import { teas } from "../teaDetails/data";
import { K } from "../util";

export const service = ({ state, previousState }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.teas ? { teas: undefined } : null)),
      TeaDetails: K(null),
      Tea: () =>
        !state.teas
          ? {
              route: previousState.route || Route.of.Home(),
              pendingRoute: Either.Y(state.route)
            }
          : null
    })
  );

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
