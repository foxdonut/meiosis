import { login } from "../login";
import { settings } from "../settings";
/*
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";
*/

export const createApp = initialRoute => ({
  initial: { route: initialRoute },

  Actions: update => Object.assign({}, login.Actions(update), settings.Actions(update))
  /*,

  services: [
    routes.service,
    settings.service,
    login.service,
    tea.service,
    teaDetails.service,
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  ]
  */
});

export { App } from "./view";
