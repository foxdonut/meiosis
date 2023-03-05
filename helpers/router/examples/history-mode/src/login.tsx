import { MeiosisCell, MeiosisViewComponent, Service } from 'meiosis-setup/types';
import { Login, State } from './types';

const loginActions = {
  prepareBlankForm: (cell: MeiosisCell<Login>) => {
    cell.update({ username: '', password: '' });
  },
  clearForm: (cell: MeiosisCell<Login>) => {
    cell.update({ username: undefined, password: undefined });
  }
};

export const loginService: Service<State> = {
  onchange: (state) => state.route.value,
  run: (cell) => {
    if (cell.state.route.value === 'login') {
      loginActions.prepareBlankForm(cell.nest('login'));
    } else {
      loginActions.clearForm(cell.nest('login'));
    }
  }
};

export const login: MeiosisViewComponent<Login> = {
  view: (cell, onLogin: (username: string) => void) => (
    <div>
      <h4>Login page</h4>
      <div
        style={{
          width: '300px',
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gridGap: '5px'
        }}>
        <span>Username:</span>
        <input type="text"
          value={cell.state.username}
          onInput={(evt) => cell.update({ username: evt.currentTarget.value })} />
        <span>Password:</span>
        <input type="password"
          value={cell.state.password}
          onInput={(evt) => cell.update({ password: evt.currentTarget.value })} />
      </div>
      <div>
        <button class="btn btn-primary" onClick={() => onLogin(cell.state.username)}>
          Login
        </button>
      </div>
    </div>
  )
};
