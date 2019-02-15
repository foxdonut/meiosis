import { coffeeDetails, coffees } from "../coffeeDetails";

export const coffee = {
  routing: {
    Arriving: ({ update }) => {
      setTimeout(() => {
        update({ coffees });
      }, 500);
    },

    CoffeeDetails: coffeeDetails.routing
  }
};
