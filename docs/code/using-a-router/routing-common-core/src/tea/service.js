import { teas } from "../teaDetails/data";
import { findRoute } from "../routes";

export const service = ({ state, update }) => {
  if (findRoute(state.route.arrive, "Tea")) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  } else if (findRoute(state.route.leave, "Tea")) {
    update({ teas: null });
  }
};
