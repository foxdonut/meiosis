import { Route, allRoutes } from "../router";

export const service = state =>
  Route.fold({
    ...allRoutes(() => ({ message: undefined })),
    Home: () => null
  })(state.route);
