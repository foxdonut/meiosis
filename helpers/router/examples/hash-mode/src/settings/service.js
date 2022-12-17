import { Route } from '../router';

export const service = (router) => (update) => (state) => {
  if (state.route.page === Route.Settings && !state.user) {
    update({
      route: router.replaceRoute(Route.Login),
      login: {
        message: 'Please login.',
        returnTo: router.toRoute(Route.Settings)
      }
    });
  }
};
