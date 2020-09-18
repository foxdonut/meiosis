import { AppService } from "../app/types";
import { Route } from "router-setup-common/src/router";
import { selectors } from "router-setup-common/src/selectors";

export const service: AppService = state => {
  if (selectors.page(state) === Route.Login) {
    if (!state.login || state.login.username == null) {
      return {
        login: {
          username: "",
          password: ""
        }
      };
    }
  } else {
    if (
      !state.user &&
      state.login &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      return { route: () => selectors.toRoute(Route.Login) };
    } else if (state.login) {
      return { login: undefined };
    }
  }
};
