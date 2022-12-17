import { Route } from '../router';
import { teas } from '../teaDetails/data';

export const service = (update) => (state) => {
  if (
    state.route.value === Route.Tea ||
    state.route.value === Route.TeaDetails
  ) {
    setTimeout(() => {
      update({ teas });
    }, 1000);
  }
};
