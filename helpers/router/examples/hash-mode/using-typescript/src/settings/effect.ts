import { EffectConstructor } from '../app/types';
import { Route, router } from '../router';

export const Effect: EffectConstructor =
  (update) => (state) => {
    if (
      state.route.page === Route.Settings &&
      !state.user
    ) {
      update({
        route: router.replaceRoute(Route.Login),
        login: {
          message: 'Please login.',
          returnTo: router.toRoute(Route.Settings)
        }
      });
    }
  };
