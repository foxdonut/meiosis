import { teas } from "../teaDetails/data";
import { findRouteSegment } from "meiosis-routing/state";

export const service = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Tea")) {
    setTimeout(() => {
      update({ teas });
    }, 500);
  } else if (findRouteSegment(state.route.leave, "Tea")) {
    update({ teas: null });
  }
};
