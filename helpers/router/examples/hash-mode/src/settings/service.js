// @ts-check
import { Page, router } from '../router';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value === Page.Settings && !cell.state.user) {
      cell.update({
        route: router.toRoute(Page.Login, {}, true),
        login: {
          message: 'Please login.',
          returnTo: router.toRoute(Page.Settings)
        }
      });
    }
  }
};
