import { Page, router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.Home, {
      exit: () => {
        console.log('exit');
        if (cell.getState().message) {
          cell.update({ message: undefined });
        }
      }
    });
  }
};
