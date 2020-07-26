/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

import { createRouter } from "../src/index";

const decodeURI = uri => uri;

describe("hardcoded paths", () => {
  const plainHashCases = [
    ["default", {}, "#!"],
    ["true", { plainHash: true }, "#"]
  ];
  describe("plainHash", () => {
    describe.each(plainHashCases)("%s", (_label, plainHashConfig, prefix) => {
      const createRouterConfig = config => Object.assign(config, plainHashConfig);
      const routeConfig = {
        "/": "Home",
        "/login": "Login",
        "/user/:id": "UserProfile"
      };
      const routeMatcher = createRouteMatcher(routeConfig);
      const matchToRoute = match => ({
        page: match.value,
        params: match.params,
        queryParams: match.queryParams
      });
      const createWindow = path => ({
        decodeURI,
        location: {
          hash: prefix + path
        }
      });

      const routeCases = [
        ["initialRoute", router => router.initialRoute],
        ["toRoute", (router, path) => router.toRoute(path)]
      ];

      describe.each(routeCases)("%s", (_label, routerTestFn) => {
        const initialRouteCases = [
          ["just a route", "/login", { page: "Login", params: {}, queryParams: {} }],
          [
            "with params",
            "/user/42",
            { page: "UserProfile", params: { id: "42" }, queryParams: {} }
          ],
          [
            "with queryParams",
            "/login?sport=tennis",
            { page: "Login", params: {}, queryParams: { sport: "tennis" } }
          ],
          [
            "with params and queryParams",
            "/user/42?sport=tennis",
            { page: "UserProfile", params: { id: "42" }, queryParams: { sport: "tennis" } }
          ]
        ];
        test.each(initialRouteCases)("%s", (_label, path, expectedResult) => {
          const routerConfig = createRouterConfig({
            routeMatcher,
            matchToRoute,
            queryString,
            wdw: createWindow(path)
          });
          const router = createRouter(routerConfig);

          expect(routerTestFn(router, path)).toEqual(
            Object.assign(expectedResult, { url: prefix + path })
          );
        });
      });

      describe("start", () => {
        test("calls onRouteChange", () => {
          const path = "/login";
          const wdw = createWindow(path);
          const routerConfig = createRouterConfig({ routeMatcher, matchToRoute, wdw });
          const router = createRouter(routerConfig);

          const onRouteChange = jest.fn();

          router.start(onRouteChange);

          wdw.onpopstate();

          const calls = onRouteChange.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toEqual({
            page: "Login",
            params: {},
            queryParams: {},
            url: prefix + path
          });
        });
      });

      describe("syncLocationBar", () => {
        test("calls pushState", () => {
          const path = "/login";
          const pushState = jest.fn();
          const wdw = Object.assign(createWindow(path), { history: { pushState } });
          const routerConfig = createRouterConfig({ routeMatcher, matchToRoute, wdw });
          const router = createRouter(routerConfig);
          const url = "#/user/42";

          router.syncLocationBar({ url });

          const calls = pushState.mock.calls;
          expect(calls.length).toBe(1);
          expect(calls[0][0]).toEqual({});
          expect(calls[0][1]).toEqual("");
          expect(calls[0][2]).toEqual(url);
        });
      });

      describe("getLinkHandler", () => {
        test("calls pushState and onpopstate", () => {
          const preventDefault = jest.fn();
          const pushState = jest.fn();
          const onpopstate = jest.fn();

          const wdw = Object.assign(createWindow("/"), { onpopstate, history: { pushState } });
          const routerConfig = createRouterConfig({ routeMatcher, matchToRoute, wdw });
          const router = createRouter(routerConfig);
          const url = "#/user/42";

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
    });
  });
});
