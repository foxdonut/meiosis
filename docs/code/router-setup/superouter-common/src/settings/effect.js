import { Route, allRoutes } from "../router";

export const Effect = router => update => state =>
  Route.fold({
    ...allRoutes(() => null),
    Settings: () => {
      if (!state.user) {
        update({
          route: () => router.replaceRoute(Route.of.Login()),
          login: {
            message: "Please login.",
            returnTo: Route.of.Settings()
          }
        });
      }
    }
  })(state.route.page);
