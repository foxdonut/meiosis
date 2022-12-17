import { Route } from '../router';
import { searchTeas } from './data';

export const service = (update) => (state) => {
  if (state.route.page === Route.TeaSearch) {
    setTimeout(() => {
      update({ searchTeas });
    }, 1000);
  }
};
