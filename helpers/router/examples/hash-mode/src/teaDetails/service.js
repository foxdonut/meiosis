import { teaMap } from './data';
import { Page } from '../router';

export const service = {
  onchange: (state) => state.route.value + state.route.params.id,
  run: (cell) => {
    if (cell.state.route.value === Page.TeaDetails) {
      const id = cell.state.route.params.id;
      cell.update({ tea: teaMap[id].description });
    }
  }
};
