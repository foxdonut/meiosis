import { beverage, coffees } from "../beverage";

export const coffee = {
  routing: {
    Arriving: ({ state, update }) => {
      const needToLoad = !state.beverages || state.beverages.length === 0;

      update({
        pleaseWait: needToLoad,
        beverages: state.beverages || []
      });

      if (needToLoad) {
        setTimeout(() => update({
          pleaseWait: false,
          beverages: coffees,
        }), 1000);
      }
    },

    Beverage: beverage.routing
  }
};
