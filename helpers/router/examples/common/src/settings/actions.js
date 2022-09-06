import { Route } from "../router";

export const Actions = (update, router) => ({
  logout: () =>
    update({
      user: null,
      route: () => router.toRoute(Route.Home),
      message: "You have been logged out."
    })
});
