import { selectors } from "router-setup-common/src/selectors";
import { Route } from "../router";

export const Actions = update => ({
  username: value => update({ login: { username: value } }),
  password: value => update({ login: { password: value } }),

  login: (username, returnTo) =>
    update({ user: username, route: () => selectors.toRoute(returnTo || Route.of.Home()) })
});
