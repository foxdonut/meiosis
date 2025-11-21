import { Page, router } from '../router';

export const actions = ({
  username: (cell, value) =>
    cell.update({ login: { username: value } }),

  password: (cell, value) =>
    cell.update({ login: { password: value } }),

  login: (cell) => {
    cell.update({
      user: cell.state.login.username
    });
    router.navigate(cell.state.login.returnTo || Page.Home);
  }
});
