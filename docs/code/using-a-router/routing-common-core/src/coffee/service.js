import { findRoute } from "meiosis-routing/state";

import { coffees } from "../beverage/data";

export const service = ({ state, update }) => {
  if (findRoute(state.route.arrive, "Coffee")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          coffees
        }),
      1000
    );
  } else if (findRoute(state.route.leave, "Coffee")) {
    update({ coffees: null });
  }
};
