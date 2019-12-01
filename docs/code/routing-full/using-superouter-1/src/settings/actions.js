import { assoc, compose } from "ramda";

import { Route } from "../routes";

export const Actions = update => ({
  logout: () =>
    update(
      compose(
        assoc("user", null),
        assoc("route", Route.of.Home())
      )
    )
});
