import { Route } from "../routes";

export const Actions = update => ({
  logout: () => update([{ user: null }, { route: Route.of.Home() }])
});
