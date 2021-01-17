import { SettingsActions, Update } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { router } from "../router";

export const Actions = (update: Update): SettingsActions => ({
  logout: () =>
    update({
      user: null,
      route: () => router.toRoute(Route.Home),
      message: "You have been logged out."
    })
});
