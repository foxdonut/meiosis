import { beverageMap } from "./data";
import { findRoute } from "../routes";
import { get } from "../util";

export const computed = state => {
  const route = findRoute(state.route, "Beverage");
  if (route) {
    const id = route.params.id;

    if (!get(state, ["beverage", id])) {
      const description = beverageMap[id].description;
      return { beverage: { [id]: description } };
    }
  } else if (state.beverage) {
    return { beverage: null };
  }
};
