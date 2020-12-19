import { Route } from "../router";
import { selectors } from "../selectors";

export const Effect = (update, router) => state => {
  if (selectors.page(state) === Route.Settings && !state.user) {
    update({
      route: router.replaceRoute("/login"),
      login: {
        message: "Please login.",
        returnTo: router.toRoute("/settings")
      }
    });
  }
};
