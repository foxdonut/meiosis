import { Route, router } from "../router";
import { selectors } from "../state";

export const service = state => {
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
      return { route: () => router.getRoute("/login") };
    } else if (state.login) {
      return { login: undefined };
    }
  }
};
