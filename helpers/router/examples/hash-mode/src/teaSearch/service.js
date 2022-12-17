import { Route } from '../router';
import { searchTeas } from './data';

export const service = (update) => (state) => {
  if (state.route.value === Route.TeaSearch) {
    update({ searchTeas });
  }
};
