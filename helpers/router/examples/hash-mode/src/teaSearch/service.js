import { Route } from '../router';
import { searchTeas } from './data';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value === Route.TeaSearch) {
      setTimeout(() => {
        cell.update({ searchTeas });
      }, 1000);
    }
  }
};
