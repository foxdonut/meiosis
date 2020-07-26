/* eslint-env jest */

import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

import { createRouter } from "../src/index";

const decodeURI = uri => uri;

const someCases = [
  ["one", x => x + 1, 11],
  ["two", x => x + 2, 12]
];

describe("each", () => {
  describe.each(someCases)("%p", (label, fn, expectedResult) => {
    test("something with " + label, () => {
      expect(fn(10)).toEqual(expectedResult);
    });
  });
});

describe("hardcoded paths", () => {
  const prefix = "#!";
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

  describe("initialRoute", () => {
    test("just a route", () => {
      const path = "/login";
      const routerConfig = { routeMatcher, matchToRoute, wdw: createWindow(path) };
      const router = createRouter(routerConfig);

      expect(router.initialRoute).toEqual({
        page: "Login",
        params: {},
        queryParams: {},
        url: prefix + path
      });
    });

    test("with params", () => {
      const path = "/user/42";
      const routerConfig = { routeMatcher, matchToRoute, wdw: createWindow(path) };
      const router = createRouter(routerConfig);

      expect(router.initialRoute).toEqual({
        page: "UserProfile",
        params: { id: "42" },
        queryParams: {},
        url: prefix + path
      });
    });

    test("with queryParams", () => {
      const path = "/login?sport=tennis";
      const routerConfig = {
        routeMatcher,
        matchToRoute,
        queryString,
        wdw: createWindow(path)
      };
      const router = createRouter(routerConfig);

      expect(router.initialRoute).toEqual({
        page: "Login",
        params: {},
        queryParams: { sport: "tennis" },
        url: prefix + path
      });
    });

    test("with params and queryParams", () => {
      const path = "/user/42?sport=tennis";
      const routerConfig = {
        routeMatcher,
        matchToRoute,
        queryString,
        wdw: createWindow(path)
      };
      const router = createRouter(routerConfig);

      expect(router.initialRoute).toEqual({
        page: "UserProfile",
        params: { id: "42" },
        queryParams: { sport: "tennis" },
        url: prefix + path
      });
    });
  });

  describe("toRoute", () => {
    test("just a route", () => {
      const path = "/login";
      const routerConfig = { routeMatcher, matchToRoute };
      const router = createRouter(routerConfig);

      expect(router.toRoute(path)).toEqual({
        page: "Login",
        params: {},
        queryParams: {},
        url: prefix + path
      });
    });

    test("with params", () => {
      const path = "/user/42";
      const routerConfig = { routeMatcher, matchToRoute };
      const router = createRouter(routerConfig);

      expect(router.toRoute(path)).toEqual({
        page: "UserProfile",
        params: { id: "42" },
        queryParams: {},
        url: prefix + path
      });
    });

    test("with queryParams", () => {
      const path = "/login?sport=tennis";
      const routerConfig = {
        routeMatcher,
        matchToRoute,
        queryString
      };
      const router = createRouter(routerConfig);

      expect(router.toRoute(path)).toEqual({
        page: "Login",
        params: {},
        queryParams: { sport: "tennis" },
        url: prefix + path
      });
    });

    test("with params and queryParams", () => {
      const path = "/user/42?sport=tennis";
      const routerConfig = {
        routeMatcher,
        matchToRoute,
        queryString
      };
      const router = createRouter(routerConfig);

      expect(router.toRoute(path)).toEqual({
        page: "UserProfile",
        params: { id: "42" },
        queryParams: { sport: "tennis" },
        url: prefix + path
      });
    });
  });

  describe("start", () => {
    test("calls onRouteChange", () => {
      const path = "/login";
      const wdw = createWindow(path);
      const routerConfig = { routeMatcher, matchToRoute, wdw };
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
      const routerConfig = { routeMatcher, matchToRoute, wdw };
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
      const routerConfig = { routeMatcher, matchToRoute, wdw };
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
