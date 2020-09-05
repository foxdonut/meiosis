import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";
import { locationBar } from "router-setup-common/src/locationBar";
import { selectors } from "router-setup-common/src/selectors";

export const createApp = router => ({
  initial: {
    route: router.initialRoute
  },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  services: [
    settings.service,
    home.service,
    login.service,
    tea.service,
    teaDetails.service,
    teaSearch.service
  ],

  Effects: update => [
    tea.Effect(update),
    teaSearch.Effect(update),
    locationBar.Effect(router, selectors)
  ]
});

export { App } from "./view";
