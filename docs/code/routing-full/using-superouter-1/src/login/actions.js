import { assoc, assocPath, compose } from "ramda";

import { Route } from "../routes";

export const Actions = update => ({
  username: value => update(assocPath(["login", "username"], value)),
  password: value => update(assocPath(["login", "password"], value)),

  login: (username, returnTo) =>
    update(
      compose(
        assoc("user", username),
        assoc("route", returnTo || Route.of.Home())
      )
    )
});
