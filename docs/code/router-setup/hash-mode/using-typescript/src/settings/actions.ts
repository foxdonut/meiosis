import { SettingsActions, Update } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const Actions = (update: Update): SettingsActions => ({
  logout: () =>
    update({
      user: null,
      route: () => selectors.toRoute(Route.Home),
      message: "You have been logged out."
    })
});
