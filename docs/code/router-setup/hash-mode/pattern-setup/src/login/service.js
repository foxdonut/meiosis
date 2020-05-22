import { Route, router } from "../router";

export const service = state => {
  if (state.route.page === Route.Login) {
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
