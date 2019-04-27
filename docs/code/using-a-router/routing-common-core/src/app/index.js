import { Route, routes } from "../routes";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";
import { coffee } from "../coffee";
import { beer } from "../beer";
import { beverage } from "../beverage";
import { brewer } from "../brewer";

export const app = {
  Initial: () => ({
    route: {
      current: [Route.Loading()],
      previous: []
    },
    teas: null,
    tea: null,
    coffees: null,
    beers: null,
    beverage: null
  }),

  Actions: update =>
    Object.assign({}, routes.Actions(update), login.Actions(update), settings.Actions(update)),

  acceptors: [settings.accept, login.accept, routes.accept],

  services: [
    login.service,
    tea.service,
    teaDetails.service,
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  ]
};
