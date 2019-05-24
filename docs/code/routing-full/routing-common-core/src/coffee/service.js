import { findRouteSegment } from "meiosis-routing/state";

import { coffees } from "../beverage/data";

export const service = ({ state, update }) => {
  if (findRouteSegment(state.route.arrive, "Coffee")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          coffees
        }),
      1000
    );
  } else if (findRouteSegment(state.route.leave, "Coffee")) {
    update({ coffees: null });
  }
};
