import { fold } from "static-tagged-union";

import { Route } from "../router";

export const service = state =>
  fold({
    Settings: () => {
      if (!state.user) {
        return {
          route: Route.Login(),
          login: {
            message: "Please login.",
            returnTo: Route.Settings()
          }
        };
      }
    }
  })(state.route);
