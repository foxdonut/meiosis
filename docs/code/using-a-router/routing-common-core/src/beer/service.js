import { beers } from "../beverage/data";
import { findRoute } from "../routes";

export const service = (state, update) => {
  if (findRoute(state.route, "Beer")) {
    if (!state.beers) {
      if (!state.pleaseWait) {
        update({ pleaseWait: true });
      } else {
        setTimeout(
          () =>
            update({
              pleaseWait: false,
              beers
            }),
          1000
        );
      }
    }
  } else if (state.beers) {
    update({ beers: null });
  }
};
