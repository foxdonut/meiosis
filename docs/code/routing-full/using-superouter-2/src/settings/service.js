import { Route, allRoutes } from "../routes";
import { K } from "../util";

export const onRouteChange = ({ state }) => ({
  [allRoutes]: K(null),
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
});
