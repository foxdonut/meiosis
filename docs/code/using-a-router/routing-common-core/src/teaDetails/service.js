import { DEL } from "mergerino";
import { findRouteSegment } from "meiosis-routing/state";

import { teaMap } from "./data";
import { whenPresent } from "../util";

export const service = ({ state, update }) => {
  whenPresent(findRouteSegment(state.route.arrive, "TeaDetails"), arrive => {
    const id = arrive.params.id;
    const description = teaMap[id].description;
    update({ tea: { [id]: description } });
  });

  whenPresent(findRouteSegment(state.route.leave, "TeaDetails"), leave => {
    const id = leave.params.id;
    update({ tea: { [id]: DEL } });
  });
};
