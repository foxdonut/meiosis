import { Router } from "meiosis-router-setup";

import { State, Patch, AppActions } from "./types";
import { App } from "../meiosis";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";
import { locationBar } from "../locationBar";

export const createApp = (router: Router): App<State, Patch, AppActions> => ({
  initial: {
    route: router.initialRoute
  },

  Actions: (update): AppActions => ({
    login: login.Actions(update),
    settings: settings.Actions(update)
  }),

  services: [
    settings.service,
    home.service,
    login.service,
    tea.service,
    teaDetails.service,
    teaSearch.service
  ],

  Effects: update => [tea.Effect(update), teaSearch.Effect(update), locationBar.Effect(router)]
});

export { App } from "./view";