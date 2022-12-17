// @ts-check
import { createRouter } from 'meiosis-router';

export const Route = {
  Home: 'Home',
  Login: 'Login',
  Settings: 'Settings',
  Tea: 'Tea',
  TeaDetails: 'TeaDetails',
  TeaSearch: 'TeaSearch',
  NotFound: 'NotFound'
};

export const routeConfig = {
  '/': Route.Home,
  '/login': Route.Login,
  '/settings': Route.Settings,
  '/tea/search': Route.TeaSearch,
  '/tea': Route.Tea,
  '/tea/:id': Route.TeaDetails,
  '/*': Route.NotFound
};

export const router = createRouter({ routeConfig });
