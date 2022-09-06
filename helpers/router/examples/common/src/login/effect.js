import { Route } from "../router";

export const Effect = (router) => (update) => (state) => {
  if (
    state.route.page !== Route.Login &&
    (state.login.username || state.login.password)
  ) {
    if (
      !state.user &&
      !confirm("You have unsaved data. Continue?")
    ) {
      update({ route: () => router.toRoute(Route.Login) });
    } else {
      update({ login: { username: "", password: "" } });
    }
  }
};
