import { Route } from "../router";

export const Actions = update => ({
  logout: () => update({ user: null, route: () => Route.of.Home() })
});
