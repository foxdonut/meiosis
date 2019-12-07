import { Either, run } from "stags";

import { teas } from "../teaDetails/data";
import { Route, otherRoutes } from "../routes";
import { K, Y, N } from "../util";

export const onRouteChange = ({ state, previousState }) => [
  () => (state.teas ? { teas: undefined } : null),
  {
    TeaDetails: K(null),
    Tea: () =>
      !state.teas
        ? {
            route: previousState.route || Route.of.Home(),
            pendingRoute: Y(state.route)
          }
        : null
  }
];

export const next = ({ state, update }) => {
  run(
    state.pendingRoute,
    Either.bifold(
      K(null),
      Route.fold({
        ...otherRoutes(() => update({ pendingRoute: N() })),
        Tea: () => {
          setTimeout(() => {
            update({
              teas: teas,
              route: Route.of.Tea(),
              pendingRoute: N()
            });
          }, 0);
        }
      })
    )
  );
};
