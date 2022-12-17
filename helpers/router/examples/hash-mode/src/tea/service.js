import { Route } from '../router';
import { teas } from '../teaDetails/data';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (
      cell.state.route.value === Route.Tea ||
      cell.state.route.value === Route.TeaDetails
    ) {
      setTimeout(() => {
        cell.update({ teas });
      }, 1000);
    } else {
      cell.update({ teas: undefined });
    }
  }
};
