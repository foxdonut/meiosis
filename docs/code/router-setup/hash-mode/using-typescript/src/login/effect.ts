import { EffectConstructor } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const Effect: EffectConstructor = update => state => {
  if (selectors.page(state) === Route.Login) {
    if (!state.login || state.login.username == null) {
      update({
        login: {
          username: "",
          password: ""
        }
      });
    }
  } else if (
    !state.user &&
    state.login &&
    (state.login.username || state.login.password) &&
    !confirm("You have unsaved data. Continue?")
  ) {
    update({ route: () => selectors.toRoute(Route.Login) });
  } else if (state.login) {
    update({ login: undefined });
  }
};
