import { Route } from "../router";
import { selectors } from "../selectors";

export const Effect = (update, router) => state => {
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
    update({ route: () => router.toRoute("/login") });
  } else if (state.login) {
    update({ login: undefined });
  }
};
