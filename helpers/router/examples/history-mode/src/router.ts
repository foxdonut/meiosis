import { createRouter } from 'meiosis-router';
import { RouteConfig } from 'meiosis-router/types';
import { Page } from './types';

export const routeConfig: RouteConfig<Page> = {
  '/': 'home',
  '/login': 'login',
  '/data1': 'data1',
  '/data2': 'data2'
};

export const router = createRouter({ routeConfig, rootPath: '' });
