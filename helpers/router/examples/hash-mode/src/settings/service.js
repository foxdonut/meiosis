import { Route, router } from '../router';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value === Route.Settings && !cell.state.user) {
      cell.update({
        route: {...router.toRoute(Route.Login), replace: true },
        login: {
          message: 'Please login.',
          returnTo: router.toRoute(Route.Settings)
        }
      });
    }
  }
};
