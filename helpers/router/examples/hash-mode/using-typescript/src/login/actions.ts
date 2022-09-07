import { LoginActions, Update } from '../app/types';
import { Route, router } from '../router';

export const Actions = (update: Update): LoginActions => ({
  username: (value) =>
    update({ login: { username: value } }),
  password: (value) =>
    update({ login: { password: value } }),

  login: (username, returnTo) =>
    update({
      user: username,
      route: returnTo || router.toRoute(Route.Home)
    })
});
