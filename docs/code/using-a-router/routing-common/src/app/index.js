import { P } from "patchinko/explicit";

import { root } from "../root";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

export const app = {
  initialState: () => ({
    routeCurrent: {},
    routeStatus: {}
  }),

  actions: update => P({},
    login.actions(update),
    settings.actions(update)
  ),

  computed: [
    login.computed
  ],

  services: [
    root.service,
    home.service,
    login.service,
    settings.service,
    coffee.service,
    beer.service
  ]
};
