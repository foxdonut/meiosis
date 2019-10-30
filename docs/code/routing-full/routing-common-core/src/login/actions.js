import { Route, navigateTo } from "../routes";

export const Actions = update => ({
  username: value => update({ login: { username: value } }),
  password: value => update({ login: { password: value } }),

  login: (username, returnTo) => update([{ user: username }, navigateTo(returnTo || Route.Home())])
});
