// mithril + mergerino + mithril-stream
import { MeiosisCell, MeiosisViewComponent, Service, setup } from '../../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';

interface Data {
  loading: boolean;
  items: string[];
}

interface Login {
  username: string;
  password: string;
}

interface State {
  page: string;
  home: string;
  data: Data;
  login: Login;
}

const home = {
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

const loginService: Service<State> = {
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === 'Login') {
      loginActions.prepareBlankForm(cell.nest('login'));
    } else {
      loginActions.clearForm(cell.nest('login'));
    }
  }
};

const login: MeiosisViewComponent<Login> = {
  view: (cell) => [
    m('h4', 'Login page'),
    m(
      'div',
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

const dataService: Service<State> = {
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === 'Data') {
      dataActions.loadData(cell.nest('data'));
    } else {
      dataActions.clearData(cell.nest('data'));
    }
  }
};

const data: MeiosisViewComponent<Data> = {
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

const app: MeiosisViewComponent<State> = {
  initial: {
    page: 'Home'
  },
  services: [loginService, dataService],
  nested: {
    home,
    login,
    data
  },
  view: (cell) => [
    m(
      'div',
      { style: { marginBottom: '10px' } },
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
      ? cell.nested.home.view(cell)
      : cell.state.page === 'Login'
      ? cell.nested.login.view(cell)
      : cell.state.page === 'Data'
      ? cell.nested.data.view(cell)
      : null
  ]
};

export const setupMithrilExample = (): void => {
  const cells = setup<State>({ stream: Stream, app });

  m.mount(document.getElementById('tsMithrilApp') as HTMLElement, {
    view: () => app.view(cells())
  });

  cells.map(() => m.redraw());
};
