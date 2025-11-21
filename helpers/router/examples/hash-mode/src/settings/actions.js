import { Page, router } from '../router';

export const actions = {
  logout: (cell) => {
    cell.update({
      user: null,
      message: 'You have been logged out.'
    });
    router.navigate(Page.Home);
  }
};
