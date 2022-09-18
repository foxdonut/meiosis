import { MeiosisCell } from 'meiosis-setup/types';
import { updateFormValue } from 'meiosis-setup/util';
import m from 'mithril';
import { Login, loginUser } from './types';

export const loginView = (cell: MeiosisCell<Login>) => [
  m('h3', 'Login Page'),
  cell.state.message && m('div', cell.state.message),
  m('form.form',
    m('div.form-group',
      m('input.form-control', {
        type: 'text',
        placeholder: 'username',
        value: cell.state.username,
        oninput: updateFormValue(cell, 'username')
      })
    ),
    m('div.form-group',
      m('input.form-control', {
        type: 'password',
        placeholder: 'password',
        value: cell.state.password,
        oninput: updateFormValue(cell, 'password')
      })
    ),
    m('button.btn.btn-primary', {
      type: 'button',
      onclick: () => cell.update({
        output: loginUser(cell.state.username)
      })
    },
      'Login'
    )
  )
];
