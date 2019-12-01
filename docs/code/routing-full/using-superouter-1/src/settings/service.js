import { always as K, identity as I, mergeLeft } from "ramda";
import { run } from "stags";

import { Route, otherRoutes } from "../routes";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(I)),
      Settings: () =>
        state.user
          ? I
          : mergeLeft({
              route: Route.of.Login(),
              login: {
                message: "Please login.",
                returnTo: Route.of.Settings()
              }
            })
    })
  );
