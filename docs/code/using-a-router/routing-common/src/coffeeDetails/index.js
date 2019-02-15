import { head } from "../util";

export const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const coffeeDetails = {
  routing: {
    Arriving: ({ routes, update }) => {
      const id = head(routes).value.id;
      const coffee = coffeeMap[id].description;

      update({ coffee });
    }
  }
};
