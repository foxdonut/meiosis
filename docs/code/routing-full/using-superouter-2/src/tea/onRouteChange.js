import { Route } from "../routes";
import { K, Y } from "../util";

export const onRouteChange = ({ state, previousState }) => [
  () => (state.teas ? { teas: undefined } : null),
  {
    TeaDetails: K(null),
    Tea: () =>
      !state.teas
        ? {
            route: previousState.route || Route.of.Home(),
            pendingRoute: Y(state.route)
          }
        : null
  }
];
