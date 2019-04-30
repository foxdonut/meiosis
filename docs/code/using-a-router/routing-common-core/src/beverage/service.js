import O from "patchinko/constant";
import { findRouteSegment } from "meiosis-routing/state";

import { beverageMap } from "./data";
import { whenPresent } from "../util";

export const service = ({ state, update }) => {
  whenPresent(findRouteSegment(state.route.arrive, "Beverage"), arrive => {
    const id = arrive.params.id;
    const description = beverageMap[id].description;
    update({ beverage: O({ [id]: description }) });
  });

  whenPresent(findRouteSegment(state.route.leave, "Beverage"), leave => {
    const id = leave.params.id;
    update({ beverage: O({ [id]: O }) });
  });
};
