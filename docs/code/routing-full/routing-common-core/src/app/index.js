import { Route, routes, navigateTo } from "../routes";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";

export const createApp = initialRoute => ({
  patch: navigateTo(initialRoute || Route.Home()),

  Actions: update =>
    Object.assign({}, routes.Actions(update), login.Actions(update), settings.Actions(update)),

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
});
