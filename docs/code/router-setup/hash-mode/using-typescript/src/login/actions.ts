import { LoginActions, Update } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const Actions = (update: Update): LoginActions => ({
  username: value => update({ login: { username: value } }),
  password: value => update({ login: { password: value } }),

  login: (username, returnTo) =>
    update({ user: username, route: returnTo || selectors.toRoute(Route.Home) })
});
