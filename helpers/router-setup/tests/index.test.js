/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import m from "mithril";

import { createRouter, createMithrilRouter } from "../src/index";

const decodeURI = uri => uri;

const mockWindow = (rootPath, prefix, path) => ({
  decodeURI,
  location: {
    hash: prefix + path,
    pathname: rootPath + path,
    search: ""
  }
});

const rootPath = "/my-server/my-base-path";

export const Route = {
  Home: "Home",
  Login: "Login",
  UserProfile: "UserProfile"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/user/:id": Route.UserProfile
};

const featherRouteMatcher = createRouteMatcher(routeConfig);

const pipe = (f, g) => a => g(f(a));

const routeMatcher = pipe(featherRouteMatcher, match => ({
  page: match.value,
  params: match.params
}));

const plainHashAndHistoryModeCases = [
  ["default hash", {}, "#!"],
  ["plainHash", { plainHash: true }, "#"],
  ["historyMode", { rootPath }, rootPath]
];

describe("historyMode and plainHash", () => {
  describe.each(plainHashAndHistoryModeCases)("%s", (_label, caseConfig, prefix) => {
    const historyMode = !!caseConfig.rootPath;

    const createWindow = path => mockWindow(caseConfig.rootPath, prefix, path);

    const createRouterConfig = config =>
      Object.assign({ routeMatcher, routeConfig }, caseConfig, config);

    const createMithrilConfig = config => Object.assign({ m, routeConfig }, caseConfig, config);

    const mPrefix = historyMode ? "" : prefix;

    const routerCases = [
      ["generic router", pipe(createRouterConfig, createRouter), prefix],
      ["mithril router", pipe(createMithrilConfig, createMithrilRouter), mPrefix]
    ];

    describe.each(routerCases)("%s", (_label, createRouterFn, expectedPrefix) => {
      describe("toUrl", () => {
        test("converts route to URL", () => {
          const path = "/login";
          const wdw = createWindow(path);
          const router = createRouterFn({ wdw });

          expect(router.toUrl(Route.Login)).toEqual(expectedPrefix + path);
        });
      });

      describe("syncLocationBar", () => {
        const syncLocationBarCases = [
          ["pushState", {}],
          ["replaceState", { replace: true }]
        ];
        test.each(syncLocationBarCases)("calls %s", (method, params) => {
          const path = "/login";
          const methodFn = jest.fn();
          const wdw = Object.assign(createWindow(path), { history: { [method]: methodFn } });
          const router = createRouterFn({ wdw });
          const url = prefix + "/user/42";
          const route = Object.assign({ page: Route.UserProfile, params: { id: "42" } }, params);

          router.syncLocationBar(route);

          const calls = methodFn.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toEqual({});
          expect(calls[0][1]).toEqual("");
          expect(calls[0][2]).toEqual(url);
        });
      });
    });

    describe("generic router", () => {
      test("uses custom toUrl", () => {
        const path = "/login";
        const wdw = createWindow(path);
        const toUrl = jest.fn();
        const router = createRouter(createRouterConfig({ toUrl, wdw }));

        router.toUrl(Route.Login);
        expect(toUrl.mock.calls.length).toBe(1);
      });

      describe("initial route", () => {
        const initialRouteCases = [
          ["slash", "/", {}, { page: Route.Home, params: {} }],
          ["empty", "", {}, { page: Route.Home, params: {} }],
          [
            "slash with queryParams",
            "/?sport=tennis",
            { queryString },
            {
              page: Route.Home,
              params: { sport: "tennis" }
            }
          ],
          [
            "empty with queryParams",
            "?sport=tennis",
            { queryString },
            {
              page: Route.Home,
              params: { sport: "tennis" }
            }
          ],
          ["just a route", "/login", {}, { page: Route.Login, params: {} }],
          ["with params", "/user/42", {}, { page: Route.UserProfile, params: { id: "42" } }],
          [
            "with queryParams",
            "/login?sport=tennis",
            { queryString },
            { page: Route.Login, params: { sport: "tennis" } }
          ],
          [
            "with params and queryParams",
            "/user/42?sport=tennis",
            { queryString },
            {
              page: Route.UserProfile,
              params: { id: "42", sport: "tennis" }
            }
          ]
        ];

        test.each(initialRouteCases)("%s", (_label, path, qsConfig, expectedResult) => {
          const routerConfig = createRouterConfig(
            Object.assign({ wdw: createWindow(path) }, qsConfig)
          );
          const router = createRouter(routerConfig);

          expect(router.initialRoute).toMatchObject(expectedResult);
        });
      });

      describe("start", () => {
        test("calls onRouteChange", () => {
          const path = "/login";
          const wdw = createWindow(path);
          const router = createRouter(createRouterConfig({ wdw }));

          const onRouteChange = jest.fn();

          router.start(onRouteChange);

          wdw.location.pathname = prefix + path;
          wdw.onpopstate();

          const calls = onRouteChange.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toMatchObject({
            page: Route.Login,
            params: {}
          });
        });
      });

      if (historyMode) {
        describe("getLinkHandler", () => {
          test("calls pushState and onpopstate", () => {
            const preventDefault = jest.fn();
            const pushState = jest.fn();
            const onpopstate = jest.fn();

            const wdw = Object.assign(createWindow("/"), {
              onpopstate,
              history: { pushState }
            });
            const router = createRouter(createRouterConfig({ wdw }));
            const url = prefix + "/user/42";

            const linkHandler = router.getLinkHandler(url);
            linkHandler({ preventDefault });

            expect(preventDefault.mock.calls.length).toBe(1);

            const calls = pushState.mock.calls;
            expect(calls.length).toBe(1);
            expect(calls[0][0]).toEqual({});
            expect(calls[0][1]).toEqual("");
            expect(calls[0][2]).toEqual(url);

            expect(onpopstate.mock.calls.length).toBe(1);
          });
        });
      }
    });

    describe("mithril router", () => {
      test("sets m.route.prefix", () => {
        const mock_m = { route: {} };
        createMithrilRouter(createMithrilConfig({ m: mock_m }));
        expect(mock_m.route.prefix).toBe(prefix);
      });
    });
  });
});

describe("generic router", () => {
  test("requires routeMatcher", () => {
    expect(() => createRouter({})).toThrow("routeMatcher is required");
  });

  test("requires routeConfig or toUrl", () => {
    expect(() => createRouter({ routeMatcher })).toThrow("routeConfig or toUrl is required");
  });
});

describe("mithril router", () => {
  test("requires m", () => {
    expect(() => createMithrilRouter({ routeConfig })).toThrow("m is required");
  });

  test("requires routeConfig", () => {
    expect(() => createMithrilRouter({ m })).toThrow("routeConfig is required");
  });
});
