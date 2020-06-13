import { Route, router } from "../router";

export const service = state => {
  if (state.route.page === Route.Settings && !state.user) {
    return {
      route: router.getRoute(Route.Login),
      login: {
        message: "Please login.",
        returnTo: router.getRoute(Route.Settings)
      }
    };
  }
};
