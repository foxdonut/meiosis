import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";
import { router } from "../router";
import { selectors } from "../state";

const syncLocationBarEffect = state => router.syncLocationBar(selectors.route(state));

export const createApp = () => ({
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

  Effects: update => [tea.Effect(update), teaSearch.Effect(update), syncLocationBarEffect]
});

export { App } from "./view";
