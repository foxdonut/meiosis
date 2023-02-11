import { Page } from '../router';
import { searchTeas } from './data';

export const service = {
  onchange: (state) => state.route.value + state.route.params.type,
  run: (cell) => {
    if (cell.state.route.value === Page.TeaSearch) {
      cell.update({ searching: true });

      setTimeout(() => {
        const teaType = cell.state.route.params.type;
        const filteredTeas = searchTeas.filter((tea) => !teaType || tea.type === teaType);
        cell.update({ searching: false, searchTeas: filteredTeas });
      }, 1000);
    }
  }
};
