import { teaMap } from './data';
import { Page } from '../router';
import { router } from '../router';

export const service = {
  init: (cell) => {
    router.listen([Page.Tea, Page.TeaDetails], {
      change: (route) => {
        const id = route.params.id;
        cell.update({ tea: teaMap[id].description });
      },
      exit: () => {
        cell.update({ tea: undefined });
      }
    });
  }
};
