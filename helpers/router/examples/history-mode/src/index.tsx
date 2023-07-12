import { meiosisSetup } from 'meiosis-setup';
import { MeiosisCell, MeiosisViewComponent } from 'meiosis-setup/types';
import { render } from 'preact';
import { Page, State } from './types';
import { router } from './router';
import { home } from './home';
import { login, loginService } from './login';
import { data, createDataService } from './data';

// Only for using Meiosis Tracer in development / Chrome DevTools.
import meiosisTracer from 'meiosis-tracer';

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
router.setup(cells);

const element = document.getElementById('app') as HTMLElement;
cells.map((cell) => {
  render(app.view(cell), element);
});

// Only for using Meiosis Tracer in development / Chrome DevTools.
meiosisTracer({
  rows: 30,
  streams: [{ stream: cells().states, label: 'states' }]
});
