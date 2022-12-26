import { Page, router } from '../router';

export const actions = {
  logout: (cell) =>
    cell.update({
      user: null,
      route: () => router.toRoute(Page.Home),
      message: 'You have been logged out.'
    })
};
