/* eslint-env jest */

import createRouteMatcher from 'feather-route-matcher';
import { createRouter } from '../src/index';
import { RouteConfig, RouterConfig } from '../src/types';

const decodeURI = (uri: string) => uri;

const mockWindow = (rootPath: string | undefined, prefix: string, path: string) => ({
  decodeURI,
  location: {
    hash: prefix + path,
    pathname: rootPath + path,
    search: ''
  },
  addEventListener: jest.fn(),
  onpopstate: () => null
});

const rootPath = '/my-server/my-base-path';

export const Route = {
  Home: 'Home',
  Login: 'Login',
  UserProfile: 'UserProfile'
};

const routeConfig: RouteConfig = {
  '/': Route.Home,
  '/login': Route.Login,
  '/user/:id': Route.UserProfile
};

const routeMatcher = createRouteMatcher(routeConfig);

type TestRouterConfig = {
  rootPath?: string;
};

type HashAndHistoryModeCases = [string, TestRouterConfig, string];

const hashAndHistoryModeCases: HashAndHistoryModeCases[] = [
  ['default hash', {}, '#!'],
  ['historyMode', { rootPath }, rootPath]
];

describe('router', () => {
  describe.each(hashAndHistoryModeCases)('%s',
    (_label, caseConfig, prefix) => {
      const historyMode = !!caseConfig.rootPath;

      const createWindow = (path) => mockWindow(caseConfig.rootPath, prefix, path);

      const createRouterConfig = (config?): RouterConfig =>
        Object.assign({ routeMatcher, routeConfig }, caseConfig, config);

      const createRouterFn = (config?) => createRouter(createRouterConfig(config));

      test('toUrl converts route to URL', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        expect(router.toUrl(Route.Login)).toEqual(prefix + path);
      });

      test('toRoute produces a Route', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        const route1 = { value: Route.Login, params: {} };
        expect(router.toRoute(Route.Login)).toEqual(route1);

        const params = { duck: 'quack' };
        const route2 = { value: Route.Login, params };
        expect(router.toRoute(Route.Login, params)).toEqual(route2);
      });

      describe('syncLocationBar', () => {
        type SyncLocationBarCases = [string, { replace?: boolean }];

        const syncLocationBarCases: SyncLocationBarCases[] = [
          ['pushState', {}],
          ['replaceState', { replace: true }]
        ];

        test.each(syncLocationBarCases)('calls %s', (method, options) => {
          const path = '/login';
          const methodFn = jest.fn();
          const wdw = Object.assign(createWindow(path), { history: { [method]: methodFn } });
          const router = createRouterFn({ wdw });
          const url = prefix + '/user/42?sport=tennis';
          const route = Object.assign(
            {
              url,
              value: Route.UserProfile,
              params: { id: '42', sport: 'tennis' }
            },
            options
          );

          router.syncLocationBar(route);

          const calls = methodFn.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toEqual({});
          expect(calls[0][1]).toEqual('');
          expect(calls[0][2]).toEqual(url);
        });
      });

      test('addEventListener in historyMode: ' + historyMode, () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        const onRouteChange = jest.fn();
        if (router.start) {
          router.start(onRouteChange);
        }

        expect(wdw.addEventListener.mock.calls.length).toBe(historyMode ? 2 : 0);
      });

      describe('initial route', () => {
        type InitialRouteCases = [string, string, { value: string, params: any }];

        const initialRouteCases: InitialRouteCases[] = [
          ['slash', '/', { value: Route.Home, params: {} }],
          ['empty', '', { value: Route.Home, params: {} }],
          [
            'slash with queryParams',
            '/?sport=tennis',
            { value: Route.Home, params: { sport: 'tennis' } }
          ],
          [
            'empty with queryParams',
            '?sport=tennis',
            { value: Route.Home, params: { sport: 'tennis' } }
          ],
          ['just a route', '/login', { value: Route.Login, params: {} }],
          ['with params', '/user/42', { value: Route.UserProfile, params: { id: '42' } }],
          [
            'with queryParams',
            '/login?sport=tennis',
            { value: Route.Login, params: { sport: 'tennis' } }
          ],
          [
            'with params and queryParams',
            '/user/42?sport=tennis',
            { value: Route.UserProfile, params: { id: '42', sport: 'tennis' } }
          ]
        ];

        test.each(initialRouteCases)('%s', (_label, path, expectedResult) => {
          const router = createRouterFn(Object.assign({ wdw: createWindow(path) }));

          expect(router.initialRoute).toMatchObject(expectedResult);
        });
      });

      test('start calls onRouteChange', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        const onRouteChange = jest.fn();

        router.start(onRouteChange);

        wdw.location.pathname = prefix + path;
        wdw.onpopstate();

        const calls = onRouteChange.mock.calls;
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toMatchObject({
          value: Route.Login,
          params: {}
        });
      });
    });
});
