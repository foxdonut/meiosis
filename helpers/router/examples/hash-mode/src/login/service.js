import { Page, router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.Login, {
      exit: () => {
        if (
          (cell.state.login.username || cell.state.login.password) &&
          (!cell.state.user && !confirm('You have unsaved data. Continue?'))) {
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
