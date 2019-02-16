import { beverage, beverages } from "../beverage";

export const beer = {
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
          beverages,
        }), 1000);
      }
    },

    Beverage: beverage.routing
  }
};
