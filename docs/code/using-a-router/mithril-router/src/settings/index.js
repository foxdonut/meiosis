import { PS } from "patchinko/explicit";

import { onChange } from "../util";
import { navigateTo } from "../util/router";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({ user: null }, navigateTo("Home")))
  }),
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Settings") {
        if (state.user) {
          update({ route: PS({ next: state.route.request }) });
        }
        else {
          update(Object.assign({
            login: PS({
              message: "Please login."
            })
          }, navigateTo("Login")));
        }
      }
    });
  }
};

export { Settings } from "./view";
