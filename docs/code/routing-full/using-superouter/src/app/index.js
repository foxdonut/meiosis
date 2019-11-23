import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
/*
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";
*/
import { Data } from "../util";

export const createApp = initialRoute => ({
  initial: { route: initialRoute, beverages: Data.None() },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  // services are ({ state, previousState }) => patch
  services: [settings.service, tea.service, teaDetails.service, coffee.service, login.service],

  next: [tea.next, coffee.next]
});

export { App } from "./view";
