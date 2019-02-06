import { P } from "patchinko/explicit";

import { parsePath } from "../util/router";

import { root } from "../root";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { coffee } from "../coffee";
import { beer } from "../beer";

const initialRoute = parsePath();

export const app = {
  initialState: () => ({
    route: {
      previous: {},
      current: {},
      next: {},
      request: initialRoute
    }
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

export { App } from "./view";
