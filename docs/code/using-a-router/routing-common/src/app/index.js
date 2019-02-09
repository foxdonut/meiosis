import { P } from "patchinko/explicit";

import { root } from "../root";
import { login } from "../login";
import { settings } from "../settings";

export const app = {
  initialState: () => ({
    routeCurrent: {},
    routeStatus: {}
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
    root.service
  ]
};
