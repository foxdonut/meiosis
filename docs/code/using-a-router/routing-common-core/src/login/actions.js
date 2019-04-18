import O from "patchinko/constant";

import { Route } from "../routes";

export const actions = update => ({
  username: value => update({ login: O({ username: value }) }),
  password: value => update({ login: O({ password: value }) }),

  login: (username, returnTo) =>
    update({
      user: username,
      route: [returnTo || Route.Home()]
    })
});
