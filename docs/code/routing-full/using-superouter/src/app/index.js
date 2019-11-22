import { always as K, assoc, dissoc, identity as I, mergeLeft, path } from "ramda";
import { run } from "stags";

import { login } from "../login";
import { settings } from "../settings";
import { Route, otherRoutes } from "../routes";
/*
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";
*/

export const createApp = initialRoute => ({
  initial: { route: initialRoute },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  // services are { state, previousState } => patch

  validate: ({ state, previousState }) =>
    // for now this redirects Settings to Login if user is not logged in,
    // and stays on current route (or Home by default) when trying to go to Tea or Coffee.
    run(
      state.route,
      Route.fold({
        ...otherRoutes(K(I)),
        Settings: () =>
          state.user
            ? I
            : mergeLeft({
                route: Route.of.Login(),
                login: {
                  message: "Please login.",
                  returnTo: Route.of.Settings()
                }
              }),
        Coffee: () => assoc("route", previousState.route || Route.of.Home())
      })
    ),

  onRouteChange: ({ state }) =>
    // for now this prepares Login upon arrival, and clears upon leaving
    run(
      state.route,
      Route.fold({
        ...otherRoutes(() => (state.login ? dissoc("login") : I)),
        Tea: () => I,
        Login: () =>
          !path(["login", "username"], state)
            ? assoc("login", mergeLeft({ username: "", password: "" }, state.login))
            : I
      })
    )

  /*
  routeChange: [login.routeChange],

  services: [
    routes.service,
    settings.service,
    login.service,
    tea.service,
    teaDetails.service,
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  ]
  */
});

export { App } from "./view";
