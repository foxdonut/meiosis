import { Service } from 'meiosis-setup/types';
import { State } from '../common/types';

export const appLoginService: Service<State> = {
  onchange: (state) => state.login.output,
  run: (cell) => {
    if (cell.state.login.output?.type === 'StayOnLogin') {
      cell.update({
        login: {
          output: undefined
        }
      });
    } else if (cell.state.login.output?.type === 'LoginUser') {
      cell.update({
        login: {
          output: undefined
        },
        user: cell.state.login.output.username
      });
    }
  }
};
