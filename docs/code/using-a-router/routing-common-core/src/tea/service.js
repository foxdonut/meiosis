import { teas } from "../teaDetails/data";
import { findRoute } from "../routes";

export const service = (state, update) => {
  if (findRoute(state.routeArrive, "Tea")) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  } else if (findRoute(state.routeLeave, "Tea")) {
    update({ teas: null });
  }
};
