import { home } from '../home';
import { login } from '../login';
import { settings } from '../settings';
import { tea } from '../tea';
import { teaDetails } from '../teaDetails';

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
    teaDetails.service
  ]
});

export { App } from './view';
