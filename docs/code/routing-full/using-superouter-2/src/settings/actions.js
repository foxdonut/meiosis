import { Route } from "../routes";

export const Actions = update => ({
  logout: () => update({ user: undefined, route: Route.of.Home() })
});
