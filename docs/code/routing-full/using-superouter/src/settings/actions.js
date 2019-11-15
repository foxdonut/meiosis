import { Route } from "../routes";

export const Actions = update => ({
  // FIXME
  logout: () => update([{ user: null }, { route: Route.of.Home() }])
});
