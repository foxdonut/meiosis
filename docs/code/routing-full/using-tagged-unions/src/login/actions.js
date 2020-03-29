import { Route } from "../routes";

export const Actions = update => ({
  username: value => update({ login: { username: value } }),
  password: value => update({ login: { password: value } }),

  login: (username, returnTo) => update([{ user: username, route: returnTo || Route.Home() }])
});
