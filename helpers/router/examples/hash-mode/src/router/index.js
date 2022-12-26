// @ts-check
import { createRouter } from 'meiosis-router';

export const Page = {
  Home: 'Home',
  Login: 'Login',
  Settings: 'Settings',
  Tea: 'Tea',
  TeaDetails: 'TeaDetails',
  TeaSearch: 'TeaSearch',
  NotFound: 'NotFound'
};

export const routeConfig = {
  '/': Page.Home,
  '/login': Page.Login,
  '/settings': Page.Settings,
  '/tea/search': Page.TeaSearch,
  '/tea': Page.Tea,
  '/tea/:id': Page.TeaDetails,
  '/*': Page.NotFound
};

export const router = createRouter({ routeConfig });
