import { RouteChangeEffect } from "meiosis-router-setup";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";

export const createApp = router => ({
  initial: {
    route: router.initialRoute || {},
    login: {
      username: "",
      password: ""
    }
  },

  Actions: update => ({
    login: login.Actions(update, router),
    settings: settings.Actions(update, router)
  }),

  Effects: update => [
    RouteChangeEffect({
      update,
      Effects: [
        login.Effect(router),
        settings.Effect(router),
        tea.Effect,
        teaDetails.Effect,
        teaSearch.Effect
      ]
    }),
    home.Effect(update)
  ]
});

export { App } from "./view";
