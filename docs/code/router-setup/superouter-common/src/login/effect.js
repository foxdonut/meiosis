import { Route, allRoutes } from "../router";

export const Effect = router => update => state =>
  Route.fold({
    ...allRoutes(() => {
      if (state.login.username || state.login.password) {
        if (!state.user && !confirm("You have unsaved data. Continue?")) {
          update({ route: () => router.toRoute(Route.of.Login()) });
        } else {
          update({ login: { username: "", password: "" } });
        }
      }
    }),
    Login: () => null
  })(state.route.page);
