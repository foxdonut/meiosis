import { DEL } from "mergerino";
import { findRouteSegment, whenPresent } from "meiosis-routing/state";

export const service = ({ state, update }) => {
  whenPresent(findRouteSegment(state.route.arrive, "Brewer"), arrive => {
    const id = arrive.params.id;
    update({ brewer: { [id]: `Brewer of beverage ${id}` } });
  });

  whenPresent(findRouteSegment(state.route.leave, "Brewer"), leave => {
    const id = leave.params.id;
    update({ brewer: { [id]: DEL } });
  });
};
