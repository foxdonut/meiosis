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
    onChange(states, ["routeRequest"], state => {
      if (state.routeRequest.id === "Coffee") {
        setTimeout(() => update({
          routeNext: state.routeRequest,
          coffees
        }), 500);
      }
      else if (state.routeRequest.id === "CoffeeDetails") {
        const id = state.routeRequest.values.id;
        const coffee = coffeeMap[id].description;

        update({
          routeNext: state.routeRequest,
          coffee
        });
      }
    });
  }
};
