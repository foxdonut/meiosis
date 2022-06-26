/* global Meiosis, m */

const home = {
  view: () => m('h4', 'Home page')
};

const loginActions = {
  prepareBlankForm: (cell) => {
    cell.update({ username: '', password: '' });
  },
  clearForm: (cell) => {
    cell.update({ username: undefined, password: undefined });
  }
};

const login = {
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
  view: (cell) => [
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
      })
    )
  ]
};

const dataActions = {
  loadData: (cell) => {
    cell.update({ loading: true });
    setTimeout(
      () =>
        cell.update({
          loading: false,
          items: ['One', 'Two']
        }),
      1500
    );
  },
  clearData: (cell) => {
    cell.update({ items: undefined });
  }
};

const data = {
  services: [
    {
      onchange: (state) => state.active,
      run: (cell) => {
        if (cell.state.active) {
          dataActions.loadData(cell);
        } else {
          dataActions.clearData(cell);
        }
      }
    }
  ],
  view: (cell) => [
    m('h4', 'Data page'),
    cell.state.loading
      ? m('div', 'Loading, please wait...')
      : m(
        'ul',
        cell.state.items.map((item) => m('li', item))
      )
  ]
};

const pages = ['home', 'login', 'data1', 'data2'];

const pageService = {
  onchange: (state) => state.page,
  run: (cell) => {
    const pagePatch = pages.reduce((result, page) => {
      result[page] = { active: cell.state.page === page };
      return result;
    }, {});
    cell.update(pagePatch);
  }
};

const app = {
  initial: {
    page: 'home'
  },
  services: [pageService],
  nested: {
    home,
    login,
    data1: data,
    data2: data
  },
  view: (cell) => [
    m('div',
      { style: { marginBottom: '10px' } },
      m('a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'home' });
          }
        },
        'Home'
      ),
      m('span', ' | '),
      m('a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'login' });
          }
        },
        'Login'
      ),
      m('span', ' | '),
      m('a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'data1' });
          }
        },
        'Data 1'
      ),
      m('span', ' | '),
      m('a',
        {
          href: '#',
          onclick: (evt) => {
            evt.preventDefault();
            cell.update({ page: 'data2' });
          }
        },
        'Data 2'
      )
    ),
    cell.nested[cell.state.page].view(cell),
    m('div',
      m('pre', JSON.stringify(cell.state, null, 2)))
  ]
};

const cells = Meiosis.mergerino.setup({ app });

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
