import { findRoute } from "meiosis-routing/state";

import { beers } from "../beverage/data";

export const service = ({ state, update }) => {
  if (findRoute(state.route.arrive, "Beer")) {
    update({ pleaseWait: true });

    setTimeout(
      () =>
        update({
          pleaseWait: false,
          beers
        }),
      1000
    );
  } else if (findRoute(state.route.leave, "Beer")) {
    update({ beers: null });
  }
};
