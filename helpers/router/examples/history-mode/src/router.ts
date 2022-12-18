import { createRouter } from 'meiosis-router';
import { PageKey } from './types';

export const routeConfig: Record<string, PageKey> = {
  '/': 'home',
  '/login': 'login',
  '/data1': 'data1',
  '/data2': 'data2'
};

export const router = createRouter({ routeConfig, rootPath: '' });
