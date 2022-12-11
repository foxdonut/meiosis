/** @jsxImportSource preact */
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import { Login } from './types';

const loginActions = {
  prepareBlankForm: (cell: MeiosisCell<Login>) => {
    cell.update({ username: '', password: '' });
  },
  clearForm: (cell: MeiosisCell<Login>) => {
    cell.update({ username: undefined, password: undefined });
  }
};

export const login: MeiosisViewComponent<Login> = {
  services: [
    {
      onchange: (state) => state.active,
      run: (cell) => {
        if (cell.state.active) {
          loginActions.prepareBlankForm(cell);
        } else {
          loginActions.clearForm(cell);
        }
      }
    }
  ],
  view: (cell, onLogin: (username: string) => void) => (<div>
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
        onInput={(evt) => cell.update({ username: evt.currentTarget.value })}/>
      <span>Password:</span>
      <input type="password"
        value={cell.state.password}
        onInput={(evt) => cell.update({ password: evt.currentTarget.value })}/>
    </div>
    <div>
      <button class="btn btn-primary" onClick={() => onLogin(cell.state.username)}>
        Login
      </button>
    </div>
  </div>)
};
