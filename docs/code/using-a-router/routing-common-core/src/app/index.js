import { Route } from "../routes";
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
    route: [ Route.Loading() ],
    teas: null,
    tea: null,
    coffees: null,
    beers: null,
    beverage: null
  }),

  accept: [
    settings.accept,
    login.accept
  ],

  computed: [
    login.computed,
    teaDetails.computed,
    beverage.computed,
    brewer.computed
  ],

  services: [
    tea.service,
    coffee.service,
    beer.service
  ]
};
