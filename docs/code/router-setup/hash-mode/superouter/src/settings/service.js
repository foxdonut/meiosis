import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        return {
          route: () => selectors.replaceRoute(Route.of.Login()),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        };
      }
    }
  })(selectors.page(state));
