import { home } from "router-setup-common/src/home";
import { login } from "router-setup-common/src/login/index-url";
import { settings } from "router-setup-common/src/settings/index-url";
import { tea } from "router-setup-common/src/tea";
import { teaDetails } from "router-setup-common/src/teaDetails";
import { teaSearch } from "router-setup-common/src/teaSearch";

export const createApp = router => ({
  Actions: update => ({
    login: login.Actions(update, router),
    settings: settings.Actions(update, router)
  }),

  Effects: update => [
    home.Effect(update),
    login.Effect(update, router),
    settings.Effect(update, router),
    tea.Effect(update),
    teaDetails.Effect(update),
    teaSearch.Effect(update)
  ]
});

export { App } from "./view";
