/** @jsxImportSource preact */
import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent, Service } from 'meiosis-setup/types';
import { render } from 'preact';
import { Page, PageKey, State } from './types';
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
  view: (cell) => (<div>
    <div class="mb-2">
      <a href="#"
        onClick={(evt) => {
          evt.preventDefault();
          cell.update({ page: 'home' });
        }}>
        Home
      </a>
      <span> | </span>
      <a href="#"
        onClick={(evt) => {
          evt.preventDefault();
          cell.update({ page: 'login' });
        }}>
        Login
      </a>
      <span> | </span>
      <a href="#"
        onClick={(evt) => {
          evt.preventDefault();
          cell.update({ page: 'data1' });
        }}>
        Data 1
      </a>
      <span> | </span>
      <a href="#"
        onClick={(evt) => {
          evt.preventDefault();
          cell.update({ page: 'data2' });
        }}>
        Data 2
      </a>
    </div>
    {views[cell.state.page](cell)}
    <div class="mt-3"><pre>{JSON.stringify(cell.state, null, 2)}</pre></div>
  </div>)
};

const cells = meiosisSetup<State>({ app });

const element = document.getElementById('app') as HTMLElement;
cells.map((cell) => {
  render(app.view(cell), element);
});
