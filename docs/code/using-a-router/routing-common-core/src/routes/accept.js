import O from "patchinko/constant";
import { routeTransition } from "meiosis-routing/state";

export const accept = state => ({
  route: O(
    Object.assign(
      {
        previous: state.route.current
      },
      routeTransition(state.route.previous, state.route.current)
    )
  )
});
