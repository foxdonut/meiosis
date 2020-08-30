/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

import { createRouter } from "../src/index";

const decodeURI = uri => uri;

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
  ["default", {}, "#!"],
  ["plainHash", { plainHash: true }, "#"],
  ["historyMode", { rootPath }, rootPath]
];

describe("historyMode and plainHash", () => {
  describe.each(plainHashAndHistoryModeCases)("%s", (_label, caseConfig, prefix) => {
    const historyMode = !!caseConfig.rootPath;

    const createRouterConfig = config =>
      Object.assign({ routeMatcher, routeConfig }, config, caseConfig);

    const createWindow = path => ({
      decodeURI,
      location: {
        hash: prefix + path,
        pathname: caseConfig.rootPath + path,
        search: ""
      }
    });

    const routeCases = [
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

    test.each(routeCases)("%s", (_label, path, qsConfig, expectedResult) => {
      const routerConfig = createRouterConfig(Object.assign({ wdw: createWindow(path) }, qsConfig));
      const router = createRouter(routerConfig);

      expect(router.initialRoute).toMatchObject(expectedResult);
    });

    describe("toUrl", () => {
      test("converts route to URL", () => {
        const path = "/login";
        const wdw = createWindow(path);
        const routerConfig = createRouterConfig({ wdw });
        const router = createRouter(routerConfig);

        expect(router.toUrl(Route.Login)).toEqual(prefix + path);
      });
    });

    describe("start", () => {
      test("calls onRouteChange", () => {
        const path = "/login";
        const wdw = createWindow(path);
        const routerConfig = createRouterConfig({ wdw });
        const router = createRouter(routerConfig);

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

    describe("syncLocationBar", () => {
      const syncLocationBarCases = [
        ["pushState", {}],
        ["replaceState", { replace: true }]
      ];
      test.each(syncLocationBarCases)("calls %s", (method, params) => {
        const path = "/login";
        const methodFn = jest.fn();
        const wdw = Object.assign(createWindow(path), { history: { [method]: methodFn } });
        const routerConfig = createRouterConfig({ wdw });
        const router = createRouter(routerConfig);
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
          const routerConfig = createRouterConfig({ wdw });
          const router = createRouter(routerConfig);
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
});
