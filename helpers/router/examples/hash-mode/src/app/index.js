import { home } from '../home';
import { login } from '../login';
import { settings } from '../settings';

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
    settings.service
  ]
});

export { App } from './view';
