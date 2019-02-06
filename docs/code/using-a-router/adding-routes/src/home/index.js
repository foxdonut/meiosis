import { PS } from "patchinko/explicit";

import { onChange } from "../util";

export const home = {
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Home") {
        // Navigating to Home
        update({
          route: PS({ next: state.route.request })
        });
      }
    });
  }
};

export { Home } from "./view";
