/* eslint-disable @typescript-eslint/no-unused-vars */
import { Fragment } from 'preact';

import { Home } from '../home';
import { Login } from '../login';
import { Settings } from '../settings';
import { Tea } from '../tea';
import { TeaSearch } from '../teaSearch';
import { NotFound } from '../notFound';
import { Page, router } from '../router';

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
  { page: Page.Home, label: 'Home' },
  { page: Page.Login, label: 'Login' },
  { page: Page.Settings, label: 'Settings' },
  { page: Page.Tea, label: 'Tea' },
  { page: Page.TeaSearch, label: 'Tea Search' }
];

export const App = ({ cell }) => {
  const Component = componentMap[cell.state.route.value];
  const isActive = (route) =>
    route === cell.state.route.value ? ' active' : '';

  return (
    <>
      <ul class="nav nav-tabs mb-2">
        {pages.map((page) => (
          <li class="nav-item">
            <a class={'nav-link' + isActive(page.page)}
              href={router.toUrl(page.page)}>{page.label}</a>
          </li>
        ))}
      </ul>
      <Component cell={cell} />
    </>
  );
};
