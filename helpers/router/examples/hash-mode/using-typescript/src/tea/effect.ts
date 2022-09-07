import { Route } from '../router';
import { EffectConstructor } from '../app/types';
import { teas } from '../teaDetails/data';

export const Effect: EffectConstructor =
  (update) => (state) => {
    if (
      state.route.page === Route.Tea ||
      state.route.page === Route.TeaDetails
    ) {
      setTimeout(() => {
        update({ teas });
      }, 1000);
    }
  };
