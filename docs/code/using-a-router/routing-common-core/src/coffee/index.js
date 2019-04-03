import { coffees } from "../beverage";
import { findRoute } from "../routes";

export const coffee = {
  service: (state, update) => {
    if (findRoute(state.route, "Coffee")) {
      if (!state.coffees) {
        if (!state.pleaseWait) {
          update({ pleaseWait: true });
        }
        else {
          setTimeout(() => update({
            pleaseWait: false,
            coffees
          }), 1000);
        }
      }
    }
    else if (state.coffees) {
      update({ coffees: null });
    }
  }
};
