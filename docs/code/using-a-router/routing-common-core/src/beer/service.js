import { findRouteSegment } from "meiosis-routing/state";

import { beers } from "../beverage/data";

export const service = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Beer")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          beers
        }),
      1000
    );
  } else if (findRouteSegment(state.route.leave, "Beer")) {
    update({ beers: null });
  }
};
