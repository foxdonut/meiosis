import { routeTransition } from "meiosis-routing/state";

export const routeAccept = state => ({
  route: routeTransition(state.route)
});
