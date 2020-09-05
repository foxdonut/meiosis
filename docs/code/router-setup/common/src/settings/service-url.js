import { Route } from "../router";
import { selectors } from "../selectors";

export const Service = router => state => {
  if (selectors.page(state) === Route.Settings && !state.user) {
    return {
      route: router.toRoute("/login", { replace: true }),
      login: {
        message: "Please login.",
        returnTo: router.toRoute("/settings")
      }
    };
  }
};
