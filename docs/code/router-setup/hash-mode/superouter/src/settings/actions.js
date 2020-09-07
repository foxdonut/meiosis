import { Route } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () => ({ page: Route.of.Home() }),
      message: "You have been logged out."
    })
});
