import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes, routes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.teas) {
        return { teas: undefined };
      }
    }),
    ...routes(["Tea", "TeaDetails"])(() => {
      if (!state.teas) {
        return { loadTeas: true };
      }
    })
  })(selectors.page(state));
