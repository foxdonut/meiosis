import { Home } from '../home';
import { Login } from '../login';
import { Settings } from '../settings';
import { Tea } from '../tea';
import { TeaSearch } from '../teaSearch';
import { NotFound } from '../notFound';
import { Route } from '../router';

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  TeaDetails: Tea,
  TeaSearch,
  NotFound
};

export const App = {
  view: ({ attrs: { state, update, actions, router } }) => {
    const Component = componentMap[state.route.page];
    const isActive = (tab) =>
      tab === Component ? 'active' : '';

    return (
      <div>
        <div class="nav navbar navbar-default">
          <ul class="nav navbar-nav">
            <li class={isActive(Home)}>
              <a href={router.toUrl(Route.Home)}>Home</a>
            </li>
            <li class={isActive(Login)}>
              <a href={router.toUrl(Route.Login)}>Login</a>
            </li>
            <li class={isActive(Settings)}>
              <a href={router.toUrl(Route.Settings)}>Settings</a>
            </li>
            <li class={isActive(Tea)}>
              <a href={router.toUrl(Route.Tea)}>Tea</a>
            </li>
            <li class={isActive(TeaSearch)}>
              <a href={router.toUrl(Route.TeaSearch)}>Tea Search</a>
            </li>
          </ul>
        </div>
        <Component state={state} update={update} actions={actions} router={router} />
      </div>
    );
  }
};
