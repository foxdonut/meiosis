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
  initial: {
    route: initialRoute,
    pendingRoute: Either.N(),
    coffees: Data.None(),
    beers: Data.None()
  },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update)),

  // onRouteChange functions are ({ state, previousState }) => { routeFold }
  onRouteChange: [
    settings.onRouteChange,
    tea.onRouteChange,
    teaDetails.onRouteChange,
    coffee.onRouteChange,
    beer.onRouteChange,
    beverage.onRouteChange,
    brewer.onRouteChange,
    login.onRouteChange
  ],

  // service functions are ({ state, previousState }) => patch
  services: [],

  next: [tea.next, coffee.next, beer.next]
});

export { App } from "./view";
