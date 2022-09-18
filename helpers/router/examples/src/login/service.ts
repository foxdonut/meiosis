import { Service } from 'meiosis-setup/types';
import { Login, stayOnLogin } from './types';

export const loginService: Service<Login> = {
  onchange: (login) => login.active,
  run: (cell) => {
    if (!cell.state.active && (cell.state.username || cell.state.password)) {
      if (confirm('You have unsaved data. Continue?')) {
        cell.update({ username: '', password: '' });
      } else {
        cell.update({ output: stayOnLogin() });
      }
    }
  }
};
