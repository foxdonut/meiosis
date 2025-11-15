import { Page } from '../router';
import { teas } from '../teaDetails/data';
import { router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.Tea, {
      enter: () => {
        setTimeout(() => {
          cell.update({ teas });
        }, 1000);
      },
      exit: () => {
        cell.update({ teas: undefined });
      }
    });
  }
};
