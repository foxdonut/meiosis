import { State, Patch, AppActions } from "./types";
import { App } from "../meiosis";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { teaSearch } from "../teaSearch";

export const createApp = (): App<State, Patch, AppActions> => ({
  initial: {},

  Actions: (update): AppActions => ({
    login: login.Actions(update),
    settings: settings.Actions(update)
  }),

  Effects: update => [
    home.Effect(update),
    login.Effect(update),
    settings.Effect(update),
    tea.Effect(update),
    teaDetails.Effect(update),
    teaSearch.Effect(update)
  ]
});

export { App } from "./view";
