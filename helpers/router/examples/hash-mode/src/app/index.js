import { home } from '../home';

export const createApp = (initialRoute) => ({
  initial: {
    route: initialRoute || {},
    login: {
      username: '',
      password: ''
    }
  },

  services: [
    home.service
  ]
});

export { App } from './view';
