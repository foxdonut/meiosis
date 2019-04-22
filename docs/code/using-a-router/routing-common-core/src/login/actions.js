import O from "patchinko/constant";

import { Route, navigateTo } from "../routes";

export const actions = update => ({
  username: value => update({ login: O({ username: value }) }),
  password: value => update({ login: O({ password: value }) }),

  login: (username, returnTo) =>
    update(
      Object.assign(
        {
          user: username
        },
        navigateTo([returnTo || Route.Home()])
      )
    )
});
