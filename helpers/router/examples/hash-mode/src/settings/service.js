import { Page, router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.Settings, {
      enter: () => {
        if (!cell.getState().user) {
          cell.update({
            route: router.toRoute(Page.Login, {}, true),
            login: {
              message: 'Please login.',
              returnTo: router.toRoute(Page.Settings)
            }
          });
        }
      }
    });
  }
};
