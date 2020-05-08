import { Route } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () => Route.Home({ queryParams: { message: "You have been logged out." } })
    })
});
