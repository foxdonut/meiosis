import { EffectConstructor } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { router } from "../router";

export const Effect: EffectConstructor = update => state => {
  if (state.route.page !== Route.Login && (state.login.username || state.login.password)) {
    if (!state.user && !confirm("You have unsaved data. Continue?")) {
      update({ route: () => router.toRoute(Route.Login) });
    } else {
      update({ login: { username: "", password: "" } });
    }
  }
};
