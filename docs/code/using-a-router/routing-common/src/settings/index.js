import { PS } from "patchinko/explicit";

import { navigateTo, onChange } from "../util";

export const settings = {
  actions: update => ({
    logout: () => update(Object.assign({ user: null }, navigateTo("Home")))
  }),
  service: (states, update) => {
    onChange(states, ["routeRequest"], state => {
      if (state.routeRequest.id === "Settings") {
        if (state.user) {
          update({ routeNext: state.routeRequest });
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
