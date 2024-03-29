import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import m from 'mithril';
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
  view: (cell, onLogin: (username: string) => void) => [
    m('h4', 'Login page'),
    m('div',
      {
        style: {
          width: '300px',
          display: 'grid',
          gridTemplateColumns: '1fr 3fr',
          gridGap: '5px'
        }
      },
      m('span', 'Username:'),
      m('input[type=text]', {
        value: cell.state.username,
        oninput: (evt: any) => cell.update({ username: evt.currentTarget.value })
      }),
      m('span', 'Password:'),
      m('input[type=password]', {
        value: cell.state.password,
        oninput: (evt: any) => cell.update({ password: evt.currentTarget.value })
      })
    ),
    m('div',
      m('button.btn.btn-primary', { onclick: () => onLogin(cell.state.username) }, 'Login')
    )
  ]
};
