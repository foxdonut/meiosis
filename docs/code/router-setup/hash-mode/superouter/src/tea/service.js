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
  })(state.route);
