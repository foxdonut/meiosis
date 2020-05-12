import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";
import { router } from "../router";

export const createApp = initialRoute => ({
  initial: {
    route: initialRoute
  },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  services: [settings.service, login.service, tea.service, teaDetails.service, teaSearch.service],

  Effects: update => [tea.effect(update), teaSearch.effect(update), router.effect]
});

export { App } from "./view";
