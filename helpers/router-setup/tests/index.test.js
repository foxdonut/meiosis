/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import m from "mithril";
import * as Superouter from "superouter";

import { createProgrammaticRouter, createMithrilRouter } from "../src/index";

const pipe = (f, g) => a => g(f(a));

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

const routeMatcher = createRouteMatcher(routeConfig);

const convertMatchToRoute = ({ match, queryParams }) => ({
  page: match.value,
  params: match.params,
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

    const mPrefix = historyMode ? "" : prefix;

    const routerCases = [
      ["generic router", pipe(createRouterConfig, createProgrammaticRouter), prefix],
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

        test.each(syncLocationBarCases)("calls %s", (method, options) => {
          const path = "/login";
          const methodFn = jest.fn();
          const wdw = Object.assign(createWindow(path), { history: { [method]: methodFn } });
          const router = createRouterFn({ queryString, wdw });
          const url = prefix + "/user/42?sport=tennis";
          const route = Object.assign(
            { page: Route.UserProfile, params: { id: "42" }, queryParams: { sport: "tennis" } },
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
    });

    describe("generic router", () => {
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
              queryParams: { sport: "tennis" }
            }
          ],
          [
            "empty with queryParams",
            "?sport=tennis",
            { queryString },
            {
              page: Route.Home,
              queryParams: { sport: "tennis" }
            }
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
            {
              page: Route.UserProfile,
              params: { id: "42" },
              queryParams: { sport: "tennis" }
            }
          ]
        ];

        test.each(initialRouteCases)("%s", (_label, path, qsConfig, expectedResult) => {
          const routerConfig = createRouterConfig(
            Object.assign({ wdw: createWindow(path) }, qsConfig)
          );
          const router = createProgrammaticRouter(routerConfig);

          expect(router.initialRoute).toMatchObject(expectedResult);
        });
      });

      describe("start", () => {
        test("calls onRouteChange", () => {
          const path = "/login";
          const wdw = createWindow(path);
          const router = createProgrammaticRouter(createRouterConfig({ wdw }));

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
            const router = createProgrammaticRouter(createRouterConfig({ wdw }));
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
        const router = createProgrammaticRouter(
          createRouterConfig({ routeMatcher, toUrl, queryString, wdw })
        );

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

describe("programmatic router", () => {
  test("requires routeMatcher", () => {
    expect(() => createProgrammaticRouter({})).toThrow("routeMatcher is required");
  });

  test("requires convertMatchToRoute", () => {
    expect(() => createProgrammaticRouter({ routeMatcher })).toThrow(
      "convertMatchToRoute is required"
    );
  });

  test("requires routeConfig or toUrl", () => {
    expect(() => createProgrammaticRouter({ routeMatcher, convertMatchToRoute })).toThrow(
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
      params: { id: "42" },
      queryParams: { sport: "tennis" }
    });
  });
});
