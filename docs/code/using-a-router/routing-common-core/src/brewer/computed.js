import O from "patchinko/constant";

import { findRoute } from "../routes";

export const computed = state => {
  const arrive = findRoute(state.route.arrive, "Brewer");

  if (arrive) {
    const id = arrive.params.id;
    return { brewer: { [id]: `Brewer of beverage ${id}` } };
  } else {
    const leave = findRoute(state.route.leave, "Brewer");
    if (leave) {
      const id = leave.params.id;
      return { brewer: { [id]: O } };
    }
  }
};
