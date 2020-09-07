import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        return {
          route: () => ({ page: Route.of.Login(), replace: true }),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        };
      }
    }
  })(selectors.page(state));
