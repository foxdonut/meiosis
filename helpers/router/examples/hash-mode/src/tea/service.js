import { Page } from '../router';
import { teas } from '../teaDetails/data';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (
      cell.state.route.value === Page.Tea ||
      cell.state.route.value === Page.TeaDetails
    ) {
      setTimeout(() => {
        cell.update({ teas });
      }, 1000);
    } else {
      cell.update({ teas: undefined });
    }
  }
};
