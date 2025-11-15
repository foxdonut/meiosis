import { Page } from '../router';
import { searchTeas } from './data';
import { router } from '../router';

export const service = {
  init: (cell) => {
    router.listen(Page.TeaSearch, {
      change: (route) => {
        cell.update({ searching: true });

        setTimeout(() => {
          const teaType = route.params.teaType;
          const filteredTeas = searchTeas.filter((tea) => !teaType || tea.type === teaType);
          cell.update({ searching: false, searchTeas: filteredTeas });
        }, 1000);
      }
    });
  }
};
