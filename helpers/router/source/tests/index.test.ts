/* eslint-env jest */

import { createRouter } from '../src/index';
import { createToUrl } from '../src/helpers';
import { Route, RouteConfig, RouterConfig } from '../src/types';
import { meiosisSetup } from 'meiosis-setup';

type Page = 'Home' | 'Login' | 'UserProfile';

const decodeURI = (uri: string) => uri;

const mockWindow = (rootPath: string | undefined, prefix: string, path: string) => ({
  decodeURI,
  history: {
    pushState: jest.fn()
  },
  location: {
    hash: prefix + path,
    origin: '',
    pathname: rootPath + path,
    search: ''
  },
  document: {
    dispatchEvent: jest.fn()
  },
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  onpopstate: () => null
});

const rootPath = '/my-server/my-base-path';

const routeConfig: RouteConfig<Page> = {
  '/': 'Home',
  '/login': 'Login',
  '/user/:id': 'UserProfile'
};

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

      const createRouterConfig = (config?: Partial<RouterConfig<Page>>): RouterConfig<Page> =>
        Object.assign({ routeConfig }, caseConfig, config);

      const createRouterFn = (config?: Partial<RouterConfig<Page>>) =>
        createRouter(createRouterConfig(config));

      test('toUrl converts route to URL', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        expect(router.toUrl('Login')).toEqual(prefix + path);
        expect(router.toUrl('UserProfile')).toEqual(prefix + '/user/undefined');
        expect(router.toUrl('UserProfile', { id: 42 })).toEqual(prefix + '/user/42');
        expect(router.toUrl('UserProfile', { id: 42, a: 1, b: 'two' }))
          .toEqual(prefix + '/user/42?a=1&b=two');
      });

      test('toRoute produces a Route', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        const route1 = { value: 'Login', params: {} };
        expect(router.toRoute('Login')).toEqual(route1);

        const params = { duck: 'quack' };
        const route2 = { value: 'Login', params };
        expect(router.toRoute('Login', params)).toEqual(route2);

        const route3 = { value: 'Login', params: {}, replace: true };
        expect(router.toRoute('Login', {}, true)).toEqual(route3);
      });

      test('navigate changes the URL', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        router.navigate('Login');
        expect(wdw.location.hash).toEqual((historyMode ? rootPath : prefix) + path);
        expect(wdw.history.pushState.mock.calls[0][2]).toEqual(prefix + path);
        wdw.history.pushState.mockClear();
      });

      test('navigate triggers popstate', () => {
        const path = '/login';
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        global.dispatchEvent = global.dispatchEvent || jest.fn();
        global.PopStateEvent = global.PopStateEvent || class {
          constructor(_type, _options) {
            // noop
          }
        };
        jest.spyOn(global, 'dispatchEvent');

        router.navigate('Login', {}, true);

        expect(global.dispatchEvent).toHaveBeenCalled();
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
          const route: Route<Page> = Object.assign(
            {
              url,
              value: 'UserProfile' as Page,
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
          ['slash', '/', { value: 'Home', params: {} }],
          ['empty', '', { value: 'Home', params: {} }],
          [
            'slash with queryParams',
            '/?sport=tennis',
            { value: 'Home', params: { sport: 'tennis' } }
          ],
          [
            'empty with queryParams',
            '?sport=tennis',
            { value: 'Home', params: { sport: 'tennis' } }
          ],
          ['just a route', '/login', { value: 'Login', params: {} }],
          ['with params', '/user/42', { value: 'UserProfile', params: { id: '42' } }],
          [
            'with queryParams',
            '/login?sport=tennis',
            { value: 'Login', params: { sport: 'tennis' } }
          ],
          [
            'with params and queryParams',
            '/user/42?sport=tennis',
            { value: 'UserProfile', params: { id: '42', sport: 'tennis' } }
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
          value: 'Login',
          params: {}
        });
      });
    }
  );

  describe('setup', () => {
    const wdw = mockWindow(undefined, '#!', '/');

    test('calls start and map with syncLocationBar', () => {
      type MyApp = { route: Route<Page>, count: number };
      const router = createRouter({ routeConfig, wdw });

      const app = { initial: { route: router.initialRoute, count: 0 } };
      const cells = meiosisSetup<MyApp>({ app });

      router.setup(cells);

      wdw.location.hash = '#!/login';
      wdw.onpopstate();

      expect(cells().state.route.value).toEqual('Login');

      wdw.location.hash = '#!/user/42';
      wdw.onpopstate();

      expect(cells().state.route.value).toEqual('UserProfile');
      expect(cells().state.route.params.id).toEqual('42');
    });
  });

  describe('createToUrl', () => {
    it('keeps slash for empty path', () => {
      const routeConfig = {
        '/': 'home',
        '/login': 'login'
      };

      const toUrl = createToUrl(routeConfig, '', true);
      const url = toUrl('home');

      expect(url).toEqual('/');
    });
  });
});
