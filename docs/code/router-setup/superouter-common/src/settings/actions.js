import { selectors } from "router-setup-common/src/selectors";
import { Route } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () => selectors.toRoute(Route.of.Home()),
      message: "You have been logged out."
    })
});
