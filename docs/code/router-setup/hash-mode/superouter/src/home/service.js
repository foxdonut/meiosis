import { selectors } from "router-setup-common/src/selectors";
import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => ({ message: undefined })),
    Home: () => null
  })(selectors.page(state));
