import { Route } from "../routes";
import { K } from "../util";

export const onRouteChange = ({ state }) => [
  K(null),
  {
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
  }
];
