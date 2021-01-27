import { Router, RouteChangeEffect } from "meiosis-router-setup";
import { State, Patch, AppActions } from "./types";
import { App } from "../meiosis";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";

export const createApp = (router: Router): App<State, Patch, AppActions> => ({
  initial: {
    route: router.initialRoute,
    login: {
      username: "",
      password: ""
    },
    searchTeas: []
  },

  Actions: (update): AppActions => ({
    login: login.Actions(update),
    settings: settings.Actions(update)
  }),

  Effects: update => [
    RouteChangeEffect({
      update,
      Effects: [login.Effect, settings.Effect, tea.Effect, teaDetails.Effect, teaSearch.Effect]
    }),
    home.Effect(update)
  ]
});

export { App } from "./view";
