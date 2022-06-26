// mithril + mergerino + mithril-stream
import { MeiosisCell, MeiosisViewComponent, Service, setup } from '../../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';

interface Page {
  active: boolean;
}

interface Data extends Page {
  loading: boolean;
  items: string[];
}

interface Login extends Page {
  username: string;
  password: string;
}

interface State extends Page {
  page: string;
  home: Page;
  data: Data;
  login: Login;
}

const home: MeiosisViewComponent<Page> = {
  view: () => m('h4', 'Home page')
};

const loginActions = {
  prepareBlankForm: (cell: MeiosisCell<Login>) => {
    cell.update({ username: '', password: '' });
  },
  clearForm: (cell: MeiosisCell<Login>) => {
    cell.update({ username: undefined, password: undefined });
  }
};

const login: MeiosisViewComponent<Login> = {
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
        oninput: (evt) => cell.update({ username: evt.target.value })
      }),
      m('span', 'Password:'),
      m('input[type=password]', {
        value: cell.state.password,
        oninput: (evt) => cell.update({ password: evt.target.value })
      })
    )
  ]
};

const dataActions = {
  loadData: (cell: MeiosisCell<Data>) => {
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
  clearData: (cell: MeiosisCell<Data>) => {
    cell.update({ items: undefined });
  }
};

const data: MeiosisViewComponent<Data> = {
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

const pages = ['home', 'login', 'data'];

const pageService: Service<State> = {
  onchange: (state) => state.page,
  run: (cell) => {
    const pagePatch = pages.reduce((result, page) => {
      result[page] = { active: cell.state.page === page };
      return result;
    }, {});
    cell.update(pagePatch);
  }
};

const app: MeiosisViewComponent<State> = {
  initial: {
    page: 'home'
  },
  services: [pageService],
  nested: {
    home,
    login,
    data
  },
  view: (cell) =>
    m('div.row',
      m('div.col-4',
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
                cell.update({ page: 'data' });
              }
            },
            'Data'
          )
        ),
        cell.nested[cell.state.page].view(cell)
      ),
      m('div.col-4', m('pre', JSON.stringify(cell.state, null, 2)))
    )
};

export const setupMithrilExample = (): void => {
  const cells = setup<State>({ stream: Stream, app });

  m.mount(document.getElementById('tsMithrilApp') as HTMLElement, {
    view: () => app.view(cells())
  });

  cells.map(() => m.redraw());
};
