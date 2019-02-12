import { coffeeDetails } from "../coffeeDetails";
import { caseOf, get } from "../util";

const routing = {
  CoffeeDetails: coffeeDetails.routing
};

export const coffee = {
  routing: {
    Arriving: ({ routes, state, update }) => {
      setTimeout(() => {
        update({
          routeCurrent: routes,
          routeStatus: caseOf("None"),
          coffees: coffeeDetails.coffees
        });

        const fn = get(routing, [get(routes[1], ["case"]), "Arriving"]);
        if (fn) {
          fn({ routes: routes.slice(1), state, update });
        }
      }, 500);
    }
    /*
      CoffeeDetails: ({ id }) => {
        const coffee = coffeeMap[id].description;

        update({
          routeCurrent: route,
          routeStatus: caseOf("None"),
          coffee
        });
      }
    })
    */
  }
};
