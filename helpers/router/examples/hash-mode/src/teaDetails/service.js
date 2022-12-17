import { teaMap } from './data';
import { Route } from '../router';

export const service = (update) => (state) => {
  if (state.route.value === Route.TeaDetails) {
    const id = state.route.params.id;
    update({ tea: teaMap[id].description });
  }
};
