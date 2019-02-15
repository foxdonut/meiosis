import { coffeeDetails } from "../coffeeDetails";

export const coffee = {
  routing: {
    Arriving: ({ update }) => {
      setTimeout(() => {
        update({
          coffees: coffeeDetails.coffees
        });
      }, 500);
    },

    CoffeeDetails: coffeeDetails.routing
  }
};
