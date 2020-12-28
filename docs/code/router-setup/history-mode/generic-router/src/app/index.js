import { home } from "router-setup-common/src/home";
import { login } from "router-setup-common/src/login/index-route";
import { settings } from "router-setup-common/src/settings/index-route";
import { tea } from "router-setup-common/src/tea";
import { teaDetails } from "router-setup-common/src/teaDetails";
import { teaSearch } from "router-setup-common/src/teaSearch";

export const createApp = () => ({
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
    teaSearch.Effect(update)
  ]
});

export { App } from "./view";
