import { Route } from "../router";

export const service = ({ state, previousState }) => {
  if (state.route.page === Route.Login) {
    if (!state.login) {
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
      return () => previousState;
    } else if (state.login) {
      return { login: undefined };
    }
  }
};
