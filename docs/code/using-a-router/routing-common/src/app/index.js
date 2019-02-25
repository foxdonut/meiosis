import { P } from "patchinko/explicit";

import { root, Loaded, Route } from "../root";
import { home } from "../home";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";

export const app = {
  initialState: () => ({
    routeCurrent: Route.Loading(),
    login: {
      username: "",
      password: ""
    },
    teas: Loaded.N()
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
    root.service,
    home.service,
    tea.service
  ]
};
