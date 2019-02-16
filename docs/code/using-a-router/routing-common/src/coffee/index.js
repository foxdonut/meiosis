import { beverage, coffees } from "../beverage";

export const coffee = {
  routing: {
    Arriving: ({ state, update }) => {
      update({
        pleaseWait: true,
        beverages: state.beverages || []
      });

      setTimeout(() => update({
        pleaseWait: false,
        beverages: coffees,
      }), 1000);
    },

    Beverage: beverage.routing
  }
};
