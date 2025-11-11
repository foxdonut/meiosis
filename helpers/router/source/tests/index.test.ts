/* eslint-env jest */

import { createRouter } from '../src/index';
import { createToUrl, expandRouteValue, flattenRouteConfig } from '../src/helpers';
import { Route, RouteConfig, Router, RouterConfig } from '../src/types';
import { meiosisSetup } from 'meiosis-setup';

type ProfilePage = 'User' | 'Home';
type SettingsPage = 'List' | 'Home' | ['Profile', ProfilePage];
type Page = 'Home' | 'Login' | 'UserProfile' | ['Settings', SettingsPage];

const decodeURI = (uri: string) => uri;

const mockWindow = (rootPath: string | undefined, prefix: string, path: string) => ({
  decodeURI,
  history: {
    pushState: jest.fn(),
    replaceState: jest.fn()
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
  '/user/:id': 'UserProfile',
  '/settings/:org': ['Settings', {
    '/profile': ['Profile', {
      '/:id': 'User',
      '': 'Home'
    }],
    '/list': 'List',
    '': 'Home'
  }]
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
    (_label, caseConfig: Partial<RouterConfig<Page>>, prefix: string) => {
      const historyMode = !!caseConfig.rootPath;

      const changePath = (wdw: any, path: string) => {
        if (historyMode) {
          wdw.location.pathname = prefix + path;
        } else {
          wdw.location.hash = prefix + path;
        }
        wdw.onpopstate();
      };

      const createWindow = (path = '/login') => mockWindow(caseConfig.rootPath, prefix, path);

      const createRouterConfig = (config?: Partial<RouterConfig<Page>>): RouterConfig<Page> =>
        Object.assign({ routeConfig }, caseConfig, config);

      const createRouterFn = (config?: Partial<RouterConfig<Page>>): Router<Page> =>
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

      test('toUrl converts route to URL for subroutes', () => {
        const wdw = createWindow();
        const router = createRouterFn({ wdw });

        expect(router.toUrl(['Settings', 'Home'], { org: 'my-org' }))
          .toEqual(prefix + '/settings/my-org');
        expect(router.toUrl(['Settings', 'List'], { org: 'my-org' }))
          .toEqual(prefix + '/settings/my-org/list');
        expect(router.toUrl(['Settings', ['Profile', 'User']], { org: 'my-org', id: 7 }))
          .toEqual(prefix + '/settings/my-org/profile/7');
        expect(router.toUrl(['Settings', ['Profile', 'Home']], { org: 'my-org' }))
          .toEqual(prefix + '/settings/my-org/profile');
      });

      test('toRoute produces a Route', () => {
        const wdw = createWindow();
        const router = createRouterFn({ wdw });

        const route1 = { value: 'Login', params: {} };
        expect(router.toRoute('Login')).toEqual(route1);

        const params = { duck: 'quack' };
        const route2 = { value: 'Login', params };
        expect(router.toRoute('Login', params)).toEqual(route2);

        const route3 = { value: 'Login', params: {}, replace: true };
        expect(router.toRoute('Login', {}, true)).toEqual(route3);
      });

      test('toRoute produces a Route for subroutes', () => {
        const wdw = createWindow();
        const router = createRouterFn({ wdw });

        const route1 = { value: ['Settings', 'Home'], params: { org: 'test' } };
        expect(router.toRoute(['Settings', 'Home'], { org: 'test' })).toEqual(route1);

        const params = { org: 'test2', id: 5 };
        const route2 = { value: ['Settings', ['Profile', 'User']], params };
        expect(router.toRoute(['Settings', ['Profile', 'User']], params)).toEqual(route2);

        const route3 = { value: ['Settings', 'List'], params: {}, replace: true };
        expect(router.toRoute(['Settings', 'List'], {}, true)).toEqual(route3);
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
        const wdw = createWindow();
        const router = createRouterFn({ wdw });

        global.dispatchEvent = global.dispatchEvent || jest.fn();
        global.PopStateEvent = global.PopStateEvent || class {
          constructor(_type: string, _options: Record<string, any>) {
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
          const methodFn = jest.fn();
          const wdw = Object.assign(createWindow(), { history: { [method]: methodFn } });
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
        const wdw = createWindow();
        const router = createRouterFn({ wdw });

        const onRouteChange = jest.fn();
        if (router.start) {
          router.start(onRouteChange);
        }

        expect(wdw.addEventListener.mock.calls.length).toBe(historyMode ? 2 : 0);
      });

      describe('initial route', () => {
        type InitialRouteCases = [string, string,
          { value: string | [string, string[]], params: any }];

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
          ],
          [
            'subroute',
            '/settings/my-org/profile/7',
            { value: ['Settings', ['Profile', 'User']], params: { org: 'my-org', id: '7' } }
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

        changePath(wdw, path);

        const calls = onRouteChange.mock.calls;
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toMatchObject({
          value: 'Login',
          params: {}
        });
      });

      describe('route listeners', () => {
        test('enter simple route', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path = '/user/42';
          router.listen('UserProfile', {
            enter: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path);

          expect(listener.mock.calls.length).toBe(1);
          expect(listener.mock.calls[0][0]).toMatchObject({
            value: 'UserProfile',
            params: { id: '42' }
          });
        });

        test('exit simple route', () => {
          const wdw = createWindow('/login');
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path = '/user/42';
          router.listen('Login', {
            exit: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path);

          expect(listener.mock.calls.length).toBe(1);
          expect(listener.mock.calls[0][0]).toMatchObject({
            value: 'UserProfile',
            params: { id: '42' }
          });
        });

        test('change simple route', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/user/42';
          const path2 = '/user/24';
          router.listen('UserProfile', {
            change: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
          expect(listener.mock.calls[0][0]).toMatchObject({
            value: 'UserProfile',
            params: { id: '24' }
          });
        });

        test('all listener', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const enterListener = jest.fn();
          const changeListener = jest.fn();
          const exitListener = jest.fn();

          const path1 = '/user/42';
          const path2 = '/user/24';
          const path3 = '/login';

          router.listen('UserProfile', {
            enter: enterListener,
            change: changeListener,
            exit: exitListener
          });

          router.start();
          expect(enterListener.mock.calls.length).toBe(0);
          expect(changeListener.mock.calls.length).toBe(0);
          expect(exitListener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(enterListener.mock.calls.length).toBe(1);
          expect(changeListener.mock.calls.length).toBe(0);
          expect(exitListener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(enterListener.mock.calls.length).toBe(1);
          expect(changeListener.mock.calls.length).toBe(1);
          expect(exitListener.mock.calls.length).toBe(0);

          changePath(wdw, path3);
          expect(enterListener.mock.calls.length).toBe(1);
          expect(changeListener.mock.calls.length).toBe(1);
          expect(exitListener.mock.calls.length).toBe(1);
        });

        test('unconcerned listener', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/settings/my-org/profile/7';
          router.listen('UserProfile', {
            enter: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(0);
        });

        test('enter subroute same level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path = '/settings/my-org/list';
          router.listen(['Settings', 'List'], {
            enter: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path);

          expect(listener.mock.calls.length).toBe(1);
          expect(listener.mock.calls[0][0]).toMatchObject({
            value: ['Settings', 'List'],
            params: { org: 'my-org' }
          });
        });

        test('exit subroute same level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/user/42';

          router.listen(['Settings', 'List'], {
            exit: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
          expect(listener.mock.calls[0][0]).toMatchObject({
            value: 'UserProfile',
            params: { id: '42' }
          });
        });

        test('change subroute same level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/settings/other-org/list';

          router.listen(['Settings', 'List'], {
            change: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
          expect(listener.mock.calls[0][0]).toMatchObject({
            value: ['Settings', 'List'],
            params: { org: 'other-org' }
          });

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(2);
        });

        test('enter subroute lower level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/settings/my-org/profile/3';
          router.listen('Settings', {
            enter: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(1);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
        });

        test('exit subroute lower level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/login';
          router.listen('Settings', {
            exit: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
        });

        test('change subroute lower level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/settings/my-org/profile/3';
          router.listen('Settings', {
            change: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(2);
        });

        test('enter subroute upper level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/list';
          const path2 = '/settings/my-org/profile/3';
          router.listen(['Settings', 'Profile'], {
            enter: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
        });

        test('exit subroute upper level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/profile/3';
          const path2 = '/settings/my-org/list';
          router.listen(['Settings', 'Profile'], {
            exit: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
        });

        test('change subroute upper level', () => {
          const wdw = createWindow();
          const router = createRouterFn({ wdw });

          const listener = jest.fn();

          const path1 = '/settings/my-org/profile/5';
          const path2 = '/settings/my-org/profile/3';
          router.listen(['Settings', 'Profile'], {
            change: listener
          });

          router.start();
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path1);
          expect(listener.mock.calls.length).toBe(0);

          changePath(wdw, path2);
          expect(listener.mock.calls.length).toBe(1);
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

  describe('flattenRouteConfig', () => {
    it('returns flat config unchanged', () => {
      const inputRouteConfig: RouteConfig<Page> = {
        '/': 'Home',
        '/login': 'Login',
        '/user/:id': 'UserProfile'
      };

      const flattenedRouteConfig = flattenRouteConfig(inputRouteConfig);
      expect(flattenedRouteConfig).toEqual(inputRouteConfig);
    });

    it('flattens nested routeConfig', () => {
      const inputRouteConfig: RouteConfig<Page> = {
        '/': 'Home',
        '/login': 'Login',
        '/user/:id': 'UserProfile',
        '/settings/:org': ['Settings', {
          '/profile': ['Profile', {
            '/:id': 'User',
            '': 'Home'
          }],
          '/list': 'List',
          '': 'Home'
        }]
      };

      const expectedRouteConfig = {
        '/': 'Home',
        '/login': 'Login',
        '/user/:id': 'UserProfile',
        '/settings/:org/profile/:id': 'Settings__Profile__User',
        '/settings/:org/profile': 'Settings__Profile__Home',
        '/settings/:org/list': 'Settings__List',
        '/settings/:org': 'Settings__Home'
      };

      const flattenedRouteConfig = flattenRouteConfig(inputRouteConfig);
      expect(flattenedRouteConfig).toEqual(expectedRouteConfig);
    });
  });

  describe('expandRouteValue', () => {
    it('returns single route value unchanged', () => {
      expect(expandRouteValue<Page>('UserProfile')).toEqual('UserProfile');
    });

    it('expands flat route value to single nested route value', () => {
      expect(expandRouteValue<Page>('Settings__List'))
        .toEqual(['Settings', 'List']);
    });

    it('expands flat route value to multiple nested route value', () => {
      expect(expandRouteValue<Page>('Settings__Profile__Home'))
        .toEqual(['Settings', ['Profile', 'Home']]);
    });
  });
});
