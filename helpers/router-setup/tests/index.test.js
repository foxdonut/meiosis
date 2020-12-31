/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import m from "mithril";
import * as Superouter from "superouter";

import { createRouter, createMithrilRouter } from "../src/index";

const pipe = (f, g) => a => g(f(a));

const decodeURI = uri => uri;

const mockWindow = (rootPath, prefix, path) => ({
  decodeURI,
  location: {
    hash: prefix + path,
    pathname: rootPath + path,
    search: ""
  },
  addEventListener: jest.fn()
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

const routeMatcher = createRouteMatcher(routeConfig);

const convertMatchToRoute = ({ value, params, queryParams }) => ({
  page: value,
  params,
  queryParams
});

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
      Object.assign({ routeMatcher, convertMatchToRoute, routeConfig }, caseConfig, config);

    const createMithrilConfig = config => Object.assign({ m, routeConfig }, caseConfig, config);

    const routerCases = [
      ["generic router", pipe(createRouterConfig, createRouter)],
      ["mithril router", pipe(createMithrilConfig, createMithrilRouter)]
    ];

    describe.each(routerCases)("%s", (_label, createRouterFn) => {
      test("toUrl converts route to URL", () => {
        const path = "/login";
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        expect(router.toUrl(Route.Login)).toEqual(prefix + path);
      });

      describe("syncLocationBar", () => {
        const syncLocationBarCases = [
          ["pushState", {}],
          ["replaceState", { replace: true }]
        ];

        test.each(syncLocationBarCases)("calls %s", (method, options) => {
          const path = "/login";
          const methodFn = jest.fn();
          const wdw = Object.assign(createWindow(path), { history: { [method]: methodFn } });
          const router = createRouterFn({ queryString, wdw });
          const url = prefix + "/user/42?sport=tennis";
          const route = Object.assign(
            {
              url,
              page: Route.UserProfile,
              params: { id: "42" },
              queryParams: { sport: "tennis" }
            },
            options
          );

          router.syncLocationBar(route);

          const calls = methodFn.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toEqual({});
          expect(calls[0][1]).toEqual("");
          expect(calls[0][2]).toEqual(url);
        });
      });

      test("addEventListener in historyMode: " + historyMode, () => {
        const path = "/login";
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        const onRouteChange = jest.fn();
        if (router.start) {
          router.start(onRouteChange);
        } else {
          router.createMithrilRoutes({ onRouteChange });
        }

        expect(wdw.addEventListener.mock.calls.length).toBe(historyMode ? 2 : 0);
      });
    });

    describe("generic router", () => {
      const createRouterFn = pipe(createRouterConfig, createRouter);

      describe("start triggers initial route", () => {
        const initialRouteCases = [
          ["slash", "/", {}, { page: Route.Home, params: {} }],
          ["empty", "", {}, { page: Route.Home, params: {} }],
          [
            "slash with queryParams",
            "/?sport=tennis",
            { queryString },
            { page: Route.Home, queryParams: { sport: "tennis" } }
          ],
          [
            "empty with queryParams",
            "?sport=tennis",
            { queryString },
            { page: Route.Home, queryParams: { sport: "tennis" } }
          ],
          ["just a route", "/login", {}, { page: Route.Login, params: {} }],
          ["with params", "/user/42", {}, { page: Route.UserProfile, params: { id: "42" } }],
          [
            "with queryParams",
            "/login?sport=tennis",
            { queryString },
            { page: Route.Login, queryParams: { sport: "tennis" } }
          ],
          [
            "with params and queryParams",
            "/user/42?sport=tennis",
            { queryString },
            { page: Route.UserProfile, params: { id: "42" }, queryParams: { sport: "tennis" } }
          ]
        ];

        test.each(initialRouteCases)("%s", (_label, path, qsConfig, expectedResult) => {
          const router = createRouterFn(Object.assign({ wdw: createWindow(path) }, qsConfig));

          expect(router.initialRoute).toMatchObject(expectedResult);

          const onRouteChange = jest.fn();

          router.start(onRouteChange);

          const calls = onRouteChange.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toMatchObject(expectedResult);
        });
      });

      test("start calls onRouteChange", () => {
        const path = "/login";
        const wdw = createWindow(path);
        const router = createRouterFn({ wdw });

        const onRouteChange = jest.fn();

        router.start(onRouteChange);

        wdw.location.pathname = prefix + path;
        wdw.onpopstate();

        const calls = onRouteChange.mock.calls;
        expect(calls.length).toBe(2);
        expect(calls[1][0]).toMatchObject({
          page: Route.Login,
          params: {}
        });
      });

      test("uses custom toUrl", () => {
        const path = "/login";
        const wdw = createWindow(path);

        const superouterConfig = {
          Home: "/",
          Login: "/login",
          UserProfile: "/user/:id"
        };

        const Route = Superouter.type("Route", superouterConfig);

        const toUrl = Route.toURL;
        const routeMatcher = path => Route.matchOr(() => Route.of.Home(), path);
        const router = createRouterFn({ routeMatcher, toUrl, queryString, wdw });

        const result = router.toUrl(Route.of.UserProfile({ id: "42" }), {}, { sport: "tennis" });

        expect(result).toBe(prefix + "/user/42?sport=tennis");
      });
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

  test("uses identity as default for convertMatchToRoute", () => {
    const path = "/user/42?sport=tennis";
    const router = createRouter({
      routeMatcher,
      routeConfig,
      queryString,
      wdw: mockWindow(null, "#!", path)
    });

    expect(router.initialRoute).toMatchObject({
      value: Route.UserProfile,
      params: { id: "42" },
      queryParams: { sport: "tennis" }
    });
  });
});

describe("mithril router", () => {
  test("requires m", () => {
    expect(() => createMithrilRouter({ routeConfig })).toThrow("m is required");
  });

  test("requires routeConfig", () => {
    expect(() => createMithrilRouter({ m })).toThrow("routeConfig is required");
  });

  test("calls onRouteChange", () => {
    const router = createMithrilRouter({ m, routeConfig });
    const onRouteChange = jest.fn();
    const mithrilRoutes = router.createMithrilRoutes({ onRouteChange });

    mithrilRoutes["/user/:id"].onmatch({ id: "42", sport: "tennis" });

    const calls = onRouteChange.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual({
      page: Route.UserProfile,
      params: { id: "42" },
      queryParams: { sport: "tennis" }
    });
  });
});
