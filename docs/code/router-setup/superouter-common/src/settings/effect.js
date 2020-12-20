import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        update({
          route: () => selectors.replaceRoute(Route.of.Login()),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        });
      }
    }
  })(selectors.page(state));
