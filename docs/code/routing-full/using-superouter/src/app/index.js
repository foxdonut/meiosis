import { Either, bifold, run } from "stags";

import { login } from "../login";
import { settings } from "../settings";
import { Route, otherRoutes } from "../routes";
import { K } from "../util";
/*
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";
*/

const { fromNullable } = Either;

export const createApp = initialRoute => ({
  initial: { route: initialRoute },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  // { state, patch } => { state, Maybe patch }
  validate: ({ state, patch }) =>
    run(
      patch.route,
      fromNullable,
      bifold(
        K(patch),
        Route.fold({
          ...otherRoutes(K(patch)),
          Settings: () =>
            state.user
              ? patch
              : {
                  route: Route.of.Login(),
                  login: {
                    message: "Please login.",
                    returnTo: Route.of.Settings()
                  }
                },
          Tea: K({ route: state.route || Route.of.Home() }),
          Coffee: K({ route: state.route || Route.of.Home() })
        })
      ),
      patch => ({ state, patch })
    ),

  // { state, Maybe patch } => Maybe patch
  onRouteChange: ({ state, patch }) =>
    Object.assign(
      patch,
      run(
        patch.route,
        fromNullable,
        bifold(
          K(patch),
          Route.fold(
            Object.assign(otherRoutes(() => (state.login ? { login: undefined } : null)), {
              Login: () =>
                !state.login
                  ? { login: Object.assign({ username: "", password: "" }, patch.login) }
                  : null
            })
          )
        )
      )
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
