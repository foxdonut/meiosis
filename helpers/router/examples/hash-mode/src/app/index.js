import { home } from '../home';
import { login } from '../login';
import { settings } from '../settings';
import { tea } from '../tea';
import { teaDetails } from '../teaDetails';
import { teaSearch } from '../teaSearch';
import { router } from './router';

export const app = {
  initial: {
    route: router.initialRoute,
    login: {
      username: '',
      password: ''
    }
  },

  services: [
    home.service,
    login.service,
    settings.service,
    tea.service,
    teaDetails.service,
    teaSearch.service
  ]
};

export { App } from './view';
