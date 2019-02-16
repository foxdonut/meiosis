import { beverage, beers } from "../beverage";

export const beer = {
  routing: {
    Arriving: ({ state, update }) => {
      update({
        pleaseWait: true,
        beverages: state.beverages || []
      });

      setTimeout(() => update({
        pleaseWait: false,
        beverages: beers,
      }), 1000);
    },

    Beverage: beverage.routing
  }
};
