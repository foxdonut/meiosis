import { Route } from "../router";
import { selectors } from "../selectors";

export const Service = router => state => {
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
      return { route: () => router.toRoute("/login") };
    } else if (state.login) {
      return { login: undefined };
    }
  }
};