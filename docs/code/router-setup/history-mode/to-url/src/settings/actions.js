import { Route, router } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () => router.toRoute(Route.Home),
      message: "You have been logged out."
    })
});
