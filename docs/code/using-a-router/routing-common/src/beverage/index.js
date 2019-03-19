import { fold, unless } from "static-tagged-union";

import { Arrived } from "../root";

export const beverages = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" },
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

export const coffees = beverages.slice(0, 2);
export const beers = beverages.slice(2, 4);

const beverageMap = beverages.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

export const beverage = {
  service: (state, update) => {
    unless(({ route }) =>
      route.forEach(fold({
        Beverage: ({ id }) => {
          update({
            routeCurrent: Arrived.Y({ route }),
            beverage: beverageMap[id].description
          });
        }
      }))
    )(state.routeCurrent);
  }
};
