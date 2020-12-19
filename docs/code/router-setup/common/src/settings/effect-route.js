import { Route } from "../router";
import { selectors } from "../selectors";

export const Effect = update => state => {
  if (selectors.page(state) === Route.Settings && !state.user) {
    update({
      route: selectors.replaceRoute(Route.Login),
      login: {
        message: "Please login.",
        returnTo: selectors.toRoute(Route.Settings)
      }
    });
  }
};
