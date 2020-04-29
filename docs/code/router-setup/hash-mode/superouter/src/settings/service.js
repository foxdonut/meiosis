import { Route, allRoutes } from "../router";

export const service = ({ state, previousState }) =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        return {
          route: previousState.route || Route.of.Home(),
          redirect: Route.of.Login(),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        };
      }
    }
  })(state.route);
