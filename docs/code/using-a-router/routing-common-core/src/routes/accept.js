import { routeTransition } from "meiosis-routing/state";

export const accept = state => ({ route: routeTransition(state.route) });
