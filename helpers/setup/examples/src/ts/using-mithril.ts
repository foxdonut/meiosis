// mithril + mergerino + mithril-stream
import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent, Service } from 'meiosis-setup/types';
import m from 'mithril';
import Stream from 'mithril/stream';
import { DomEvent, Page, PageKey, State } from './types';
import { home } from './home';
import { login } from './login';
import { data } from './data';

const pages = ['home', 'login', 'data1', 'data2'];

const pageService: Service<State> = {
  onchange: (state) => state.page,
  run: (cell) => {
    const pagePatch = pages.reduce((result, page) => {
      result[page] = { active: cell.state.page === page };
      return result;
    }, {} as Record<string, Page>);
    cell.update(pagePatch);
  }
};

const actions = {
  onLogin: (cell: MeiosisCell<State>, loggedInUser: string): void => {
    cell.update({ loggedInUser, page: 'data1' });
  }
};

const views: Record<PageKey, (cell: MeiosisCell<State>) => any> = {
  home: (cell) => cell.nested.home.view(cell),
  login: (cell) => cell.nested.login.view(cell,
    (loggedInUser: string) => actions.onLogin(cell, loggedInUser)),
  data1: (cell) => cell.nested.data1.view(cell, cell.state.loggedInUser),
  data2: (cell) => cell.nested.data2.view(cell, cell.state.loggedInUser)
};

const app: MeiosisViewComponent<State> = {
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
  view: (cell) =>
    m('div.row',
      m('div.col-4',
        m('div',
          { style: { marginBottom: '10px' } },
          m('a',
            {
              href: '#',
              onclick: (evt: DomEvent) => {
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
              onclick: (evt: DomEvent) => {
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
              onclick: (evt: DomEvent) => {
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
              onclick: (evt: DomEvent) => {
                evt.preventDefault();
                cell.update({ page: 'data2' });
              }
            },
            'Data 2'
          )
        ),
        views[cell.state.page](cell)
      ),
      m('div.col-4', m('pre', JSON.stringify(cell.state, null, 2)))
    )
};

export const setupMithrilExample = (): void => {
  const cells = meiosisSetup<State>({ stream: Stream, app });

  m.mount(document.getElementById('tsMithrilApp') as HTMLElement, {
    view: () => app.view(cells())
  });

  cells.map(() => m.redraw());
};
