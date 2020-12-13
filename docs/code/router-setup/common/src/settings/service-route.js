import { Route } from "../router";
import { selectors } from "../selectors";

export const service = state => {
  if (selectors.page(state) === Route.Settings && !state.user) {
    return {
      route: selectors.replaceRoute(Route.Login),
      login: {
        message: "Please login.",
        returnTo: selectors.toRoute(Route.Settings)
      }
    };
  }
};