import { Route } from "../routes";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
// import { coffee } from "../coffee";
// import { beer } from "../beer";
// import { beverage } from "../beverage";
// import { brewer } from "../brewer";
import { Data } from "../util";

export const createApp = initialRoute => ({
  initial: {
    route: initialRoute || Route.Home(),
    teas: Data.None()
  },

  Actions: update => Object.assign({}, login.Actions(update) /* settings.Actions(update)*/),

  services: [
    login.service,
    settings.service,
    tea.service,
    teaDetails.service
    /*
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  */
  ],

  effects: [tea.effect, /* coffee.effect, beer.effect,*/ settings.effect]
});

export { App } from "./view";
