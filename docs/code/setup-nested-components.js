/* global Meiosis, m */

import { home } from './home';
import { login } from './login';
import { data } from './data';

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

const cells = Meiosis.setup({ app });

m.mount(document.getElementById('app'), {
  view: () => app.view(cells())
});

cells.map(() => m.redraw());
