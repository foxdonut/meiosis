import { teaMap } from './data';
import { Route } from '../router';

export const service = {
  onchange: (state) => state.route.value + state.route.params.id,
  run: (cell) => {
    if (cell.state.route.value === Route.TeaDetails) {
      const id = cell.state.route.params.id;
      cell.update({ tea: teaMap[id].description });
    }
  }
};
