import O from "patchinko/constant";

import { beverageMap } from "./data";
import { findRoute } from "../routes";

export const computed = state => {
  const arrive = findRoute(state.route.arrive, "Beverage");
  if (arrive) {
    const id = arrive.params.id;
    const description = beverageMap[id].description;
    return { beverage: { [id]: description } };
  } else {
    const leave = findRoute(state.route.leave, "Beverage");
    if (leave) {
      const id = leave.params.id;
      return { beverage: { [id]: O } };
    }
  }
};
