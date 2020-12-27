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
