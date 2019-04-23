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
  initialState: () => ({
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

  actions: update =>
    Object.assign({}, routes.actions(update), login.actions(update), settings.actions(update)),

  accept: [settings.accept, login.accept, routes.accept],

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
