/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { Home } from '../home';
import { Login } from '../login';
import { Settings } from '../settings';
import { Tea } from '../tea';
import { TeaSearch } from '../teaSearch';
import { NotFound } from '../notFound';
import { Route, router } from '../router';

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  TeaDetails: Tea,
  TeaSearch,
  NotFound
};

const pages = [
  { page: Home, route: Route.Home, label: 'Home' },
  { page: Login, route: Route.Login, label: 'Login' },
  { page: Settings, route: Route.Settings, label: 'Settings' },
  { page: Tea, route: Route.Tea, label: 'Tea' },
  { page: TeaSearch, route: Route.TeaSearch, label: 'Tea Search' }
];

export const App = ({ cell }) => {
  const Component = componentMap[cell.state.route.value];
  const isActive = (route) =>
    route === cell.state.route.value ? ' active' : '';

  return (
    <>
      <ul class="nav nav-tabs">
        {pages.map((page) => (
          <li class="nav-item">
            <a class={'nav-link' + isActive(page.route)}
              href={router.toUrl(page.route)}>{page.label}</a>
          </li>
        ))}
      </ul>
      <Component cell={cell} />
    </>
  );
};
