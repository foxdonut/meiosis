import { Page, router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.Login, {
      exit: () => {
        const state = cell.getState();
        if (
          (state.login.username || state.login.password) &&
          (!state.user && !confirm('You have unsaved data. Continue?'))) {
          return router.toRoute(Page.Login);
        } else {
          cell.update({
            login: {
              username: '',
              password: '',
              message: '',
              returnTo: undefined
            }
          });
        }
      }
    });
  }
};
