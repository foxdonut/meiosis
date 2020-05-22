import { Route, router } from "../router";

export const service = state => {
  if (state.route.page === Route.Settings && !state.user) {
    return {
      route: router.getRoute("/login"),
      login: {
        message: "Please login.",
        returnTo: router.getRoute("/settings")
      }
    };
  }
};
