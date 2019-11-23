import { assoc, compose, dissoc, identity as I } from "ramda";
import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { teas } from "../teaDetails/data";

export const service = ({ state, previousState }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.teas ? dissoc("teas") : I)),
      Tea: () =>
        !state.teas
          ? compose(
              assoc("route", previousState.route || Route.of.Home()),
              assoc("pendingRoute", state.route)
            )
          : I
    })
  );

export const next = ({ state, update }) => {
  if (state.pendingRoute) {
    run(
      state.pendingRoute,
      Route.fold({
        ...otherRoutes(() => update(dissoc("pendingRoute"))),
        Tea: () => {
          setTimeout(() => {
            update(
              compose(
                assoc("teas", teas),
                assoc("route", state.pendingRoute),
                dissoc("pendingRoute")
              )
            );
          }, 0);
        }
      })
    );
  }
};
