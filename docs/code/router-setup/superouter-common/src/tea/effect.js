import { selectors } from "router-setup-common/src/selectors";
import { teas } from "router-setup-common/src/teaDetails/data";
import { Route, allRoutes, routes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.teas) {
        update({ teas: undefined });
      }
    }),
    ...routes(["Tea", "TeaDetails"])(() => {
      if (!state.teas) {
        (state.loading &&
          setTimeout(() => {
            update({ teas, loading: false });
          }, 1000)) ||
          update({ loading: true });
      }
    })
  })(selectors.page(state));
