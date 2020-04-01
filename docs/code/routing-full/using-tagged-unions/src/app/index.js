import { Route } from "../routes";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { beverages } from "../beverages";
import { beverage } from "../beverage";
import { brewer } from "../brewer";
import { Data } from "../util";

export const createApp = initialRoute => ({
  initial: {
    route: initialRoute || Route.Home(),
    teas: Data.None(),
    beverages: Data.None()
  },

  Actions: update => Object.assign({}, login.Actions(update) /* settings.Actions(update)*/),

  services: [
    login.service,
    settings.service,
    tea.service,
    teaDetails.service,
    beverages.service,
    beverage.service,
    brewer.service
  ],

  effects: [settings.effect, tea.effect, beverages.effect]
});

export { App } from "./view";
