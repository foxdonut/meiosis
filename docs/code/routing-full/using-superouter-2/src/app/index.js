import { Either } from "stags";

import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beverage } from "../beverage";
import { beer } from "../beer";
import { brewer } from "../brewer";
import { Data } from "../util";

export const createApp = initialRoute => ({
  initial: { route: initialRoute, pendingRoute: Either.N(), beverages: Data.None() },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  // onRouteChange functions are ({ state, previousState }) => [defaultFn, {routeFold}]
  onRouteChange: [
    settings.onRouteChange,
    tea.onRouteChange,
    teaDetails.onRouteChange,
    login.onRouteChange
  ],

  // service functions are ({ state, previousState }) => patch
  services: [coffee.service, beer.service, beverage.service, brewer.service],

  next: [tea.next, coffee.next, beer.next]
});

export { App } from "./view";
