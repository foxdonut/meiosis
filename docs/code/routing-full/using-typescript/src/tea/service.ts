import { findRouteSegment } from "meiosis-routing/state";
import { teas } from "../teaDetails/data";

export const service = ({ state, update }): void => {
  if (findRouteSegment(state.route.arrive, "Tea")) {
    setTimeout((): void => {
      update({ teas });
    }, 500);
  } else if (findRouteSegment(state.route.leave, "Tea")) {
    update({ teas: null });
  }
};
