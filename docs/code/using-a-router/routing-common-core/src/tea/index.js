import { teas } from "../teaDetails";
import { findRoute } from "../routes";

export const tea = {
  service: (state, update) => {
    if (findRoute(state.routeArrive, "Tea")) {
      setTimeout(() => {
        update({ teas });
      }, 500);
    }
    else if (findRoute(state.routeLeave, "Tea")) {
      update({ teas: null });
    }
  }
};
