import { caseOf, fold } from "../util";

const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffee = {
  routing: {
    Arriving: ({ route, update }) => fold(route, {
      Coffee: () => {
        setTimeout(() => update({
          routeCurrent: route,
          routeStatus: caseOf("None"),
          coffees
        }), 500);
      },
      CoffeeDetails: ({ id }) => {
        const coffee = coffeeMap[id].description;

        update({
          routeCurrent: route,
          routeStatus: caseOf("None"),
          coffee
        });
      }
    })
  }
};
