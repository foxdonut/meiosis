import { coffees } from "../beverage";
import { contains } from "../util";

export const coffee = {
  service: (state, update) => {
    if (contains(state.route, "Coffee")) {
      if (!state.coffees) {
        if (!state.pleaseWait) {
          update({ pleaseWait: true });
        }

        setTimeout(() => update({
          pleaseWait: false,
          coffees
        }), 1000);
      }
    }
    else if (state.coffees) {
      update({ coffees: null });
    }
  }
};
