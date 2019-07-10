import { Route, navigateTo } from "../routes";

export const Actions = update => ({
  logout: () => update([{ user: null }, navigateTo(Route.Home())])
});
