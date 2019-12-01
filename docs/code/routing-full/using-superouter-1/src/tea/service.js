import { always as K, assoc, compose, dissoc, identity as I } from "ramda";
import { Either, run } from "stags";

import { Route, otherRoutes } from "../routes";
import { teas } from "../teaDetails/data";

export const service = ({ state, previousState }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(() => (state.teas ? dissoc("teas") : I)),
      TeaDetails: K(I),
      Tea: () =>
        !state.teas
          ? compose(
              assoc("route", previousState.route || Route.of.Home()),
              assoc("pendingRoute", Either.Y(state.route))
            )
          : I
    })
  );

export const next = ({ state, update }) => {
  run(
    state.pendingRoute,
    Either.bifold(
      K(null),
      Route.fold({
        ...otherRoutes(() => update(assoc("pendingRoute", Either.N()))),
        Tea: () => {
          setTimeout(() => {
            update(
              compose(
                assoc("teas", teas),
                assoc("route", Route.of.Tea()),
                assoc("pendingRoute", Either.N())
              )
            );
          }, 0);
        }
      })
    )
  );
};
