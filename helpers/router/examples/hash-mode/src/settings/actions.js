import { Route, router } from '../router';

export const actions = {
  logout: (cell) =>
    cell.update({
      user: null,
      route: () => router.toRoute(Route.Home),
      message: 'You have been logged out.'
    })
};
