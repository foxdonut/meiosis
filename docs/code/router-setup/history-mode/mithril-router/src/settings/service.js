import { Route, router } from "../router";
import { selectors } from "../state";

export const service = state => {
  if (selectors.page(state) === Route.Settings && !state.user) {
    return {
      route: router.getRoute(Route.Login),
      login: {
        message: "Please login.",
        returnTo: router.getRoute(Route.Settings)
      }
    };
  }
};
