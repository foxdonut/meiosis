import { Route } from "../router";

export const Actions = update => ({
  logout: () =>
    update({
      user: null,
      route: () =>
        Object.assign(Route.of.Home(), { queryParams: { message: "You have been logged out." } })
    })
});
