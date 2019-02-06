import { onChange } from "../util";

export const home = {
  service: (states, update) => {
    onChange(states, ["routeRequest"], state => {
      if (state.routeRequest.id === "Home") {
        // Navigating to Home
        update({ routeNext: state.routeRequest });
      }
    });
  }
};
