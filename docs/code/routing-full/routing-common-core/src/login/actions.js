import { Route, navigateTo } from "../routes";

export const Actions = ({ update, combine }) => ({
  username: value => update({ login: { username: value } }),
  password: value => update({ login: { password: value } }),

  login: (username, returnTo) =>
    update(combine([{ user: username }, navigateTo([returnTo || Route.Home()])]))
});
