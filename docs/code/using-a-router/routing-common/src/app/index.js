import { P } from "patchinko/explicit";

import { root, Loaded, Route } from "../root";
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
    teas: Loaded.N(),
    tea: {},
    coffees: Loaded.N(),
    beers: Loaded.N(),
    beverage: {}
  }),

  actions: update => P({},
    root.actions(update),
    login.actions(update),
    settings.actions(update)
  ),

  computed: [
    login.computed
  ],

  services: [
    login.service,
    settings.service,
    tea.service,
    teaDetails.service,
    coffee.service,
    beer.service,
    beverage.service,
    brewer.service
  ]
};
