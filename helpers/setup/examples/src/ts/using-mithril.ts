// mithril + mergerino + mithril-stream
import { MeiosisViewComponent, Service, setup } from '../../../source/dist/mergerino';
import m from 'mithril';
import Stream from 'mithril/stream';
import { DomEvent, Page, State } from './types';
import { home } from './home';
import { login } from './login';
import { data } from './data';

const pages = ['home', 'login', 'data'];

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
