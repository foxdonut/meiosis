import { DEL } from "mergerino";
import { findRouteSegment, whenPresent } from "meiosis-routing/state";

import { beverageMap } from "./data";

export const service = ({ state, update }) => {
  whenPresent(findRouteSegment(state.route.arrive, "Beverage"), arrive => {
    const id = arrive.params.id;
    const description = beverageMap[id].description;
    update({ beverage: { [id]: description } });
  });

  whenPresent(findRouteSegment(state.route.leave, "Beverage"), leave => {
    const id = leave.params.id;
    update({ beverage: { [id]: DEL } });
  });
};
