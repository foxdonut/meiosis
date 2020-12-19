import { EffectConstructor } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const Effect: EffectConstructor = update => state => {
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
