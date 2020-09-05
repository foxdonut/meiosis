import { Route } from "../router";
import { selectors } from "../selectors";

export const Actions = update => ({
  username: value => update({ login: { username: value } }),
  password: value => update({ login: { password: value } }),

  login: (username, returnTo) =>
    update({ user: username, route: returnTo || selectors.toRoute(Route.Home) })
});
