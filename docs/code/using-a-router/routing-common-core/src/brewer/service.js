import O from "patchinko/constant";

import { findRoute } from "../routes";

export const service = ({ state, update }) => {
  const arrive = findRoute(state.route.arrive, "Brewer");

  if (arrive) {
    const id = arrive.params.id;
    update({ brewer: { [id]: `Brewer of beverage ${id}` } });
  } else {
    const leave = findRoute(state.route.leave, "Brewer");
    if (leave) {
      const id = leave.params.id;
      update({ brewer: { [id]: O } });
    }
  }
};
