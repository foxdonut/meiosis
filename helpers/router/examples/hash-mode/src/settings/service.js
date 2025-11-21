import { Page, router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.Settings, {
      enter: () => {
        if (!cell.getState().user) {
          cell.update({
            login: {
              message: 'Please login.',
              returnTo: Page.Settings
            }
          });
          return router.toRoute(Page.Login, {}, true);
        }
      }
    });
  }
};
