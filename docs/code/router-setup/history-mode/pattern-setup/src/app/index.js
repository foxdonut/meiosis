import { home } from "router-setup-common/src/home";
import { login } from "router-setup-common/src/login/index-url";
import { settings } from "router-setup-common/src/settings/index-url";
import { tea } from "router-setup-common/src/tea";
import { teaDetails } from "router-setup-common/src/teaDetails";
import { teaSearch } from "router-setup-common/src/teaSearch";
import { locationBar } from "router-setup-common/src/locationBar";

export const createApp = router => ({
  initial: {
    route: router.initialRoute
  },

  Actions: update =>
    Object.assign({}, login.Actions(update, router), settings.Actions(update, router)),

  services: [
    settings.Service(router),
    home.service,
    login.Service(router),
    tea.service,
    teaDetails.service,
    teaSearch.service
  ],

  Effects: update => [tea.Effect(update), teaSearch.Effect(update), locationBar.Effect(router)]
});

export { App } from "./view";
