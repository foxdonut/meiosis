/* global m */

const loginActions = {
  prepareBlankForm: (cell) => {
    cell.update({ username: '', password: '' });
  },
  clearForm: (cell) => {
    cell.update({ username: undefined, password: undefined });
  }
};

export const login = {
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
  view: (cell, onLogin) => [
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
        oninput: (evt) =>
          cell.update({ username: evt.target.value })
      }),
      m('span', 'Password:'),
      m('input[type=password]', {
        value: cell.state.password,
        oninput: (evt) =>
          cell.update({ password: evt.target.value })
      }),
      m('div',
        m('button.btn.btn-primary',
          { onclick: () => onLogin(cell.state.username) },
          'Login')
      )
    )
  ]
};
