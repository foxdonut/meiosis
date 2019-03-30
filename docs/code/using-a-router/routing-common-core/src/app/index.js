import { P } from "patchinko/explicit";

import { root, Route } from "../root";
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
    tea: {},
    coffees: null,
    beers: null,
    beverage: {}
  }),

  actions: update => P({},
    root.actions(update),
    login.actions(update),
    settings.actions(update)
  ),

  accept: [
    settings.accept,
    login.accept
  ],

  computed: [
    login.computed
  ],

  services: [
    tea.service,
    teaDetails.service,
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  ]
};
