import O from "patchinko/constant";
import { findRouteSegment } from "meiosis-routing/state";

import { whenPresent } from "../util";

export const service = ({ state, update }) => {
  whenPresent(findRouteSegment(state.route.arrive, "Brewer"), arrive => {
    const id = arrive.params.id;
    update({ brewer: O({ [id]: `Brewer of beverage ${id}` }) });
  });

  whenPresent(findRouteSegment(state.route.leave, "Brewer"), leave => {
    const id = leave.params.id;
    update({ brewer: O({ [id]: O }) });
  });
};
