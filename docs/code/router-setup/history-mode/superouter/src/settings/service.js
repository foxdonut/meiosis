import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        return {
          route: () => Object.assign(Route.of.Login(), { replace: true }),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        };
      }
    }
  })(state.route);
