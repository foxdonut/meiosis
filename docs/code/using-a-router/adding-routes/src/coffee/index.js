import { PS } from "patchinko/explicit";

import { onChange } from "../util";

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffee = {
  service: (states, update) => {
    onChange(states, ["route", "request"], state => {
      if (state.route.request.id === "Coffee") {
        setTimeout(() => update({
          route: PS({ next: state.route.request }),
          coffees
        }), 500);
      }
      else if (state.route.request.id === "CoffeeDetails") {
        const id = state.route.request.values.id;
        const coffee = coffeeMap[id].description;

        update({
          route: PS({ next: state.route.request }),
          coffee
        });
      }
    });
  }
};

export { Coffee } from "./view";
