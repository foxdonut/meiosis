import { home } from "router-setup-common/src/home";
import { login } from "router-setup-common/src/login/index-route";
import { settings } from "router-setup-common/src/settings/index-route";
import { tea } from "router-setup-common/src/tea";
import { teaDetails } from "router-setup-common/src/teaDetails";
import { teaSearch } from "router-setup-common/src/teaSearch";
import { locationBar } from "router-setup-common/src/locationBar";

export const createApp = router => ({
  Actions: update => ({
    login: login.Actions(update),
    settings: settings.Actions(update)
  }),

  Effects: update => [
    home.Effect(update),
    login.Effect(update),
    settings.Effect(update),
    tea.Effect(update),
    teaDetails.Effect(update),
    teaSearch.Effect(update),
    locationBar.Effect(router)
  ]
});

export { App } from "./view";
