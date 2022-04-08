/* global m, mergerino */
const [stream, scan] = [m.stream, m.stream.scan];
const merge = mergerino;

const actions = {
  loadData: (cell) =>
    setTimeout(
      () =>
        cell.update({
          data: ['One', 'Two']
        }),
      1500
    )
};

const loginService = {
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === 'Login') {
      cell.update({
        login: { username: '', password: '' }
      });
    } else {
      return cell.update({ login: undefined });
    }
  }
};

const dataService = {
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === 'Data') {
      cell.update({ data: 'loading' });
      actions.loadData(cell);
    } else {
      cell.update({ data: undefined });
    }
  }
};

const app = {
  initial: {
    page: 'Home'
  },

  services: [loginService, dataService],

  view: (cell) => [
    m(
      'div',
      m(
        'a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'Home' });
          }
        },
        'Home'
      ),
      m('span', ' | '),
      m(
        'a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'Login' });
          }
        },
        'Login'
      ),
      m('span', ' | '),
      m(
        'a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'Data' });
          }
        },
        'Data'
      )
    ),
    cell.state.page === 'Home'
      ? m('h4', 'Home page')
      : cell.state.page === 'Login'
      ? [
          m('h4', 'Login page'),
          m(
            'div',
            m('span', 'Username:'),
            m('input[type=text]', {
              value: cell.state.login.username,
              oninput: (evt) =>
                cell.update({
                  login: { username: evt.target.value }
                })
            })
          ),
          m(
            'div',
            m('span', 'Password:'),
            m('input[type=password]', {
              value: cell.state.login.password,
              oninput: (evt) =>
                cell.update({
                  login: { password: evt.target.value }
                })
            })
          )
        ]
      : cell.state.page === 'Data'
      ? [
          m('h4', 'Data page'),
          cell.state.data === 'loading'
            ? m('div', 'Loading, please wait...')
            : m(
                'ul',
                cell.state.data.map((item) => m('li', item))
              )
        ]
      : null,
    m('pre', JSON.stringify(cell.state, null, 2))
  ]
};

const dropRepeats = (
  states,
  onchange = (state) => state
) => {
  let prev = undefined;
  const result = stream();

  states.map((state) => {
    const next = onchange(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};

const update = stream();
const states = scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });

app.services.forEach((service) => {
  dropRepeats(states, service.onchange).map((state) =>
    service.run(createCell(state))
  );
});

const cells = dropRepeats(states).map(createCell);

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
