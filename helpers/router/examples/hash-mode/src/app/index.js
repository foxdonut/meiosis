import { home } from '../home';
import { login } from '../login';
import { settings } from '../settings';
import { tea } from '../tea';
import { teaDetails } from '../teaDetails';
import { teaSearch } from '../teaSearch';

export const createApp = (initialRoute) => ({
  initial: {
    route: initialRoute || {},
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
});

export { App } from './view';
