import { routeTransition } from "meiosis-routing/state";

export const accept = (state): any => ({ route: routeTransition(state.route) });
