// @ts-check
/** @jsxImportSource preact */
import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import { render } from 'preact';
import { Page, State } from './types';
import { router } from './router';
import { home } from './home';
import { login, loginService } from './login';
import { data, createDataService } from './data';

const actions = {
  onLogin: (cell: MeiosisCell<State>, loggedInUser: string): void => {
    cell.update({ loggedInUser, route: router.toRoute('data1') });
  }
};

const views: Record<Page, (cell: MeiosisCell<State>) => any> = {
  home: (cell) => cell.nested.home.view(cell),
  login: (cell) => cell.nested.login.view(cell,
    (loggedInUser: string) => actions.onLogin(cell, loggedInUser)),
  data1: (cell) => cell.nested.data1.view(cell, cell.state.loggedInUser),
  data2: (cell) => cell.nested.data2.view(cell, cell.state.loggedInUser)
};

const app: MeiosisViewComponent<State> = {
  initial: {
    route: router.initialRoute
  },
  services: [
    loginService,
    createDataService('data1'),
    createDataService('data2')
  ],
  nested: {
    home,
    login,
    data1: data,
    data2: data
  },
  view: (cell) => (
    <div>
      <div class="mb-2">
        <a href={router.toUrl('home')}>Home</a>
        <span> | </span>
        <a href={router.toUrl('login')}>Login</a>
        <span> | </span>
        <a href={router.toUrl('data1')}>Data 1</a>
        <span> | </span>
        <a href={router.toUrl('data2')}>Data 2</a>
      </div>
      {views[cell.state.route.value](cell)}
    </div>
  )
};

const cells = meiosisSetup<State>({ app });
const cell = cells();
router.start((route) => cell.update({ route: () => route }));
cells.map((cell) => {
  router.syncLocationBar(cell.state.route);
});

const element = document.getElementById('app') as HTMLElement;
cells.map((cell) => {
  render(app.view(cell), element);
});
