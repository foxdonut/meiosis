import { beers } from "../beverage";
import { contains } from "../util";

export const beer = {
  service: (state, update) => {
    if (contains(state.route, "Beer")) {
      if (!state.beers) {
        if (!state.pleaseWait) {
          update({ pleaseWait: true });
        }

        setTimeout(() => update({
          pleaseWait: false,
          beers
        }), 1000);
      }
    }
    else if (state.beers) {
      update({ beers: null });
    }
  }
};
