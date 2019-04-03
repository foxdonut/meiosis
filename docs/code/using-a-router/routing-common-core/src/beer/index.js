import { beers } from "../beverage";
import { findRoute } from "../routes";

export const beer = {
  service: (state, update) => {
    if (findRoute(state.route, "Beer")) {
      if (!state.beers) {
        if (!state.pleaseWait) {
          update({ pleaseWait: true });
        }
        else {
          setTimeout(() => update({
            pleaseWait: false,
            beers
          }), 1000);
        }
      }
    }
    else if (state.beers) {
      update({ beers: null });
    }
  }
};
