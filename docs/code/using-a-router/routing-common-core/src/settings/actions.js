import { Route } from "../routes";

export const actions = update => ({
  logout: () =>
    update({
      user: null,
      route: [Route.Home()]
    })
});
