import { home } from "router-setup-common/src/home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "router-setup-common/src/tea";
import { teaDetails } from "router-setup-common/src/teaDetails";
import { teaSearch } from "router-setup-common/src/teaSearch";
import { locationBar } from "router-setup-common/src/locationBar";
import { selectors } from "../state";

export const createApp = router => ({
  initial: {
    route: router.initialRoute
  },

  Actions: update =>
    Object.assign({}, login.Actions(update, router), settings.Actions(update, router)),

  services: [
    settings.Service(router),
    home.Service(selectors),
    login.Service(router),
    tea.Service(selectors),
    teaDetails.Service(selectors),
    teaSearch.Service(selectors)
  ],

  Effects: update => [
    tea.Effect(update),
    teaSearch.Effect(update),
    locationBar.Effect(router, selectors)
  ]
});

export { App } from "./view";
