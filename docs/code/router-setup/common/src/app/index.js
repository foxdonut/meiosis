import { RouteChangeEffect } from "meiosis-router-setup";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";

export const createApp = router => ({
  initial: {
    route: router.initialRoute
  },

  Actions: update => ({
    login: login.Actions(update, router),
    settings: settings.Actions(update, router)
  }),

  Effects: update => [
    RouteChangeEffect({
      update,
      Effects: [settings.Effect(router), tea.Effect, teaDetails.Effect, teaSearch.Effect]
    }),
    home.Effect(update),
    login.Effect(update, router)
  ]
});

export { App } from "./view";
