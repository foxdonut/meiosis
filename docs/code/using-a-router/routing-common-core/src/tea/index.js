import { teas } from "../teaDetails";
import { findRoute } from "../routes";

export const tea = {
  service: (state, update) => {
    if (findRoute(state.route, "Tea")) {
      if (!state.teas) {
        setTimeout(() => {
          update({ teas });
        }, 500);
      }
    }
    else if (state.teas) {
      update({ teas: null });
    }
  }
};
