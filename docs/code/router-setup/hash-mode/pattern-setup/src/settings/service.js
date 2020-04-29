import { Route, router } from "../router";

export const service = ({ state }) => {
  if (state.route.page === Route.Settings && !state.user) {
    return {
      route: router.routeMatcher("/login"),
      login: {
        message: "Please login.",
        returnTo: router.routeMatcher("/settings")
      }
    };
  }
};
