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

const { Y, N, fromNullable } = Either;

export const createApp = initialRoute => ({
  initial: { route: initialRoute },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  // { state, patch } => { state, Maybe patch }
  validate: ({ state, patch }) =>
    run(
      fromNullable(patch.route),
      bifold(
        K(Y(patch)),
        Route.fold({
          ...otherRoutes(K(Y(patch))),
          Settings: () =>
            state.user
              ? Y(patch)
              : Y({
                  route: Route.of.Login(),
                  login: {
                    message: "Please login.",
                    returnTo: Route.of.Settings()
                  }
                }),
          Tea: N,
          Coffee: N
        })
      ),
      patch => ({ state, patch })
    ),

  // { state, Maybe patch } => Maybe patch
  onRouteChange: ({ state, patch }) =>
    run(
      patch,
      Either.map(patch =>
        Object.assign(
          patch,
          run(
            patch.route,
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
