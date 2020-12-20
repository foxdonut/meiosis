import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.message) {
        update({ message: undefined });
      }
    }),
    Home: () => null
  })(selectors.page(state));
