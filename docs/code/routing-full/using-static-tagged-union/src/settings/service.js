import { fold } from "static-tagged-union";

import { Route } from "../router";

export const service = ({ state, previousState }) =>
  fold({
    Settings: () => {
      if (!state.user) {
        return {
          route: previousState.route || Route.Home(),
          redirect: Route.Login(),
          login: {
            message: "Please login.",
            returnTo: Route.Settings()
          }
        };
      }
    }
  })(state.route);
