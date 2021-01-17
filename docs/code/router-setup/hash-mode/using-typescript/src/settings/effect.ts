import { EffectConstructor } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { router } from "../router";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page === Route.Settings && !state.user) {
    update({
      route: router.replaceRoute(Route.Login),
      login: {
        message: "Please login.",
        returnTo: router.toRoute(Route.Settings)
      }
    });
  }
};
