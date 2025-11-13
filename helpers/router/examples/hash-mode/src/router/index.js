// @ts-check
import { createRouter } from 'meiosis-router';

export const Page = {
  Home: 'Home',
  Login: 'Login',
  Settings: 'Settings',
  Tea: 'Tea',
  TeaHome: 'TeaHome',
  TeaDetails: 'TeaDetails',
  TeaSearch: 'TeaSearch',
  NotFound: 'NotFound'
};

/** @type {import('meiosis-router/types').RouteConfig<any>} */
export const routeConfig = {
  '/': Page.Home,
  '/login': Page.Login,
  '/settings': Page.Settings,
  '/tea/search': Page.TeaSearch,
  '/tea': [Page.Tea, {
    '/:id': Page.TeaDetails,
    '': Page.TeaHome
  }],
  '/*': Page.NotFound
};

export const router = createRouter({ routeConfig });
