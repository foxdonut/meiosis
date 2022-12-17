import { Route, router } from '../router';

export const service = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (
      cell.state.route.value !== Route.Login &&
      (cell.state.login.username || cell.state.login.password)
    ) {
      if (
        !cell.state.user &&
        !confirm('You have unsaved data. Continue?')
      ) {
        cell.update({ route: () => router.toRoute(Route.Login) });
      } else {
        cell.update({ login: { username: '', password: '' } });
      }
    }
  }
};
