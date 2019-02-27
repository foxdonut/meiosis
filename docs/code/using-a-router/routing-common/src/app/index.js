import { P } from "patchinko/explicit";

import { root, Loaded, Route } from "../root";
import { login } from "../login";
import { settings } from "../settings";
import { tea } from "../tea";
import { teaDetails } from "../teaDetails";

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
    login.service,
    settings.service,
    tea.service,
    teaDetails.service
  ]
};
