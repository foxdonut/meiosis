import { findRoute } from "../routes";
import { get } from "../util";

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
  computed: state => {
    const route = findRoute(state.route, "Beverage");
    if (route) {
      const id = route.params.id;

      if (!get(state, ["beverage", id])) {
        const description = beverageMap[id].description;
        return { beverage: { [id]: description } };
      }
    }
    else if (state.beverage) {
      return { beverage: null };
    }
  }
};
