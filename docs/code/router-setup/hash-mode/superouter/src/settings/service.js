import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        return {
          route: Route.of.Login(),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        };
      }
    }
  })(state.route);
