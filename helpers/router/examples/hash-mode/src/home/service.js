import { Page } from '../router';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value !== Page.Home && cell.state.message) {
      cell.update({ message: undefined });
    }
  }
};
