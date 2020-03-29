import { fold } from "static-tagged-union";
import { T } from "ducklings";
import { Route } from "../routes";

export const service = ({ state, previousState }) =>
  T(state.route)(
    fold({
      Settings: () =>
        !state.user && {
          route: previousState.route || Route.Home(),
          redirect: Route.Login(),
          login: {
            message: "Please login.",
            returnTo: Route.Settings()
          }
        }
    })
  );
