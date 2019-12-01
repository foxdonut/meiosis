import { run } from "stags";

import { Route, otherRoutes } from "../routes";
import { K } from "../util";

export const service = ({ state }) =>
  run(
    state.route,
    Route.fold({
      ...otherRoutes(K(null)),
      Settings: () =>
        state.user
          ? null
          : {
              route: Route.of.Login(),
              login: {
                message: "Please login.",
                returnTo: Route.of.Settings()
              }
            }
    })
  );
