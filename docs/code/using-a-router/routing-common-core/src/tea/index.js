import { teas } from "../teaDetails";
import { contains } from "../util";

export const tea = {
  service: (state, update) => {
    if (contains(state.route, "Tea")) {
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
