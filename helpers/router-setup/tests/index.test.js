/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import m from "mithril";
import stream from "mithril/stream";
import * as Superouter from "superouter";
import merge from "mergerino";

import { createRouter, createMithrilRouter, RouteChangeEffect } from "../src/index";

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

const convertMatch = ({ value, params }) => ({ page: value, params });

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
      Object.assign({ routeMatcher, convertMatch, routeConfig }, caseConfig, config);

    const createMithrilConfig = config => Object.assign({ m, routeConfig }, caseConfig, config);

    const routerCases = [
      ["generic router", pipe(createRouterConfig, createRouter)],
      ["mithril router", pipe(createMithrilConfig, createMithrilRouter)]
    ];

    describe.each(routerCases)("%s", (_label, createRouterFn) => {
      test("toRoute converts a page to a route", () => {
        const router = createRouterFn();

        expect(router.toRoute(Route.Login)).toEqual({
          page: Route.Login,
          params: {},
          changed: true
        });
      });

      test("toRoute converts a page and params to a route", () => {
        const router = createRouterFn();

        expect(router.toRoute(Route.UserProfile, { id: "42" })).toEqual({
          page: Route.UserProfile,
          params: { id: "42" },
          changed: true
        });
      });

      test("replaceRoute converts a page to a replace route", () => {
        const router = createRouterFn();

        expect(router.replaceRoute(Route.Login)).toEqual({
          page: Route.Login,
          params: {},
          changed: true,
          replace: true
        });
      });

      test("toRoute converts a page and params to a replace route", () => {
        const router = createRouterFn();

        expect(router.replaceRoute(Route.UserProfile, { id: "42" })).toEqual({
          page: Route.UserProfile,
          params: { id: "42" },
          changed: true,
          replace: true
        });
      });

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
              params: { id: "42", sport: "tennis" }
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

      describe("initial route", () => {
        const initialRouteCases = [
          ["slash", "/", {}, { page: Route.Home, params: {} }],
          ["empty", "", {}, { page: Route.Home, params: {} }],
          [
            "slash with queryParams",
            "/?sport=tennis",
            { queryString },
            { page: Route.Home, params: { sport: "tennis" } }
          ],
          [
            "empty with queryParams",
            "?sport=tennis",
            { queryString },
            { page: Route.Home, params: { sport: "tennis" } }
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
            { page: Route.UserProfile, params: { id: "42", sport: "tennis" } }
          ]
        ];

        test.each(initialRouteCases)("%s", (_label, path, qsConfig, expectedResult) => {
          const router = createRouterFn(Object.assign({ wdw: createWindow(path) }, qsConfig));

          expect(router.initialRoute).toMatchObject(expectedResult);
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
        expect(calls.length).toBe(1);
        expect(calls[0][0]).toMatchObject({
          page: Route.Login,
          params: {},
          changed: true
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

        const result = router.toUrl(Route.of.UserProfile({ id: "42" }));

        expect(result).toBe(prefix + "/user/42");
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

  test("requires convertMatch", () => {
    expect(() => createRouter({ routeMatcher })).toThrow("convertMatch is required");
  });

  test("requires routeConfig or toUrl", () => {
    expect(() => createRouter({ routeMatcher, convertMatch })).toThrow(
      "routeConfig or toUrl is required"
    );
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
      params: { id: "42", sport: "tennis" },
      changed: true
    });
  });
});

describe("route change effect", () => {
  test("creates an effect for route changes", () => {
    const Effect1 = update => state => {
      if (state.route.page === Route.Home) {
        update({ effect1: true });
      }
    };

    const Effect2 = update => state => {
      if (state.route.page === Route.Login) {
        update({ effect2: true });
      }
    };

    const update = stream();
    const states = stream.scan(merge, { route: { page: Route.UserProfile } }, update);
    const effect = RouteChangeEffect({ update, Effects: [Effect1, Effect2] });
    states.map(effect);

    update({ route: { page: Route.Home, changed: true } });
    expect(states()).toMatchObject({
      route: { page: Route.Home, changed: false },
      effect1: true
    });

    update({ route: { page: Route.Login, changed: true } });
    expect(states()).toMatchObject({
      route: { page: Route.Login, changed: false },
      effect1: true,
      effect2: true
    });
  });
});
