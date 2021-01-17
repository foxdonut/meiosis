import { Route, allRoutes } from "../router";

export const Effect = update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.message) {
        update({ message: undefined });
      }
    }),
    Home: () => null
  })(state.route.page);
