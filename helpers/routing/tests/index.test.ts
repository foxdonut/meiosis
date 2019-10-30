import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";
import Mapper from "url-mapper";

import {
  createRouteSegments,
  findRouteSegment,
  findRouteSegmentWithParams,
  diffRoute,
  diffRouteParams,
  navigateTo,
  routeTransition,
  whenPresent,
  Actions,
  Routing
} from "../src/state";

import {
  findPathParams,
  findQueryParams,
  setParams,
  convertToPath,
  createRouteMap,
  createRouter,
  createFeatherRouter,
  createUrlMapperRouter
} from "../src/router-helper";

const Route = createRouteSegments([
  "Home",
  "Login",
  "User",
  "Profile",
  "About",
  "Search",
  "Details",
  "Beverage",
  "Brewer",
  "Invalid"
]);

const routeConfig1 = {
  Home: "/",
  About: "/about",
  User: [
    "/user/:id",
    {
      Profile: "/profile"
    }
  ]
};

const routeConfig2 = {
  Search: ["/search/:id?page?sort", { Details: "/details/:type?filter" }]
};

const routeConfig3 = {
  Beverage: [
    "/beverage/:id",
    {
      Brewer: ["/brewer", ["id"]]
    }
  ]
};

const routeConfig4 = {
  Home: "/",
  Invalid: "/:404..."
};

describe("state", (): void => {
  describe("createRouteSegments", (): void => {
    test("route segment", (): void => {
      expect(Route.Home()).toEqual({ id: "Home", params: {} });
    });

    test("route segment with params", (): void => {
      expect(Route.Login({ returnTo: "Home" })).toEqual({
        id: "Login",
        params: { returnTo: "Home" }
      });
    });
  });

  describe("findSegmentRoute", (): void => {
    const route = [Route.User({ id: 42 }), Route.Profile()];

    test("found route", (): void => {
      expect(findRouteSegment(route, "Profile")).toEqual({ id: "Profile", params: {} });
    });

    test("found route segment", (): void => {
      expect(findRouteSegment(route, Route.User())).toEqual({ id: "User", params: { id: 42 } });
    });

    test("should be: no route found", (): void => {
      expect(findRouteSegment(route, Route.About())).toBeUndefined();
    });

    test("should tolerate null route", (): void => {
      expect(findRouteSegment(null, Route.About())).toBeUndefined();
    });
  });

  describe("findRouteSegmentWithParams", (): void => {
    const route = [Route.User({ id: 42 }), Route.Profile()];

    test("found route segment with params", (): void => {
      expect(findRouteSegmentWithParams(route, Route.User({ id: 42 }))).toEqual(
        Route.User({ id: 42 })
      );
    });

    test("should be: no route segment found", (): void => {
      expect(findRouteSegmentWithParams(route, Route.User({ id: 43 }))).toBeUndefined();
    });

    test("should tolerate null route", (): void => {
      expect(findRouteSegmentWithParams(null, Route.User({ id: 43 }))).toBeUndefined();
    });

    test("found route segment with nested params", (): void => {
      expect(
        findRouteSegmentWithParams(
          [Route.User({ data: { id: 42 } })],
          Route.User({ data: { id: 42 } })
        )
      ).toEqual(Route.User({ data: { id: 42 } }));
    });
  });

  describe("diffRoute", (): void => {
    test("diff route segments", (): void => {
      expect(diffRoute([Route.Home()], [Route.About()])).toEqual({ Home: Route.Home() });
    });

    test("diff route, same params", (): void => {
      expect(diffRoute([Route.User({ id: 42 })], [Route.User({ id: 43 })])).toEqual({});
    });

    test("diff route params", (): void => {
      expect(diffRouteParams([Route.User({ id: 42 })], [Route.User({ id: 43 })])).toEqual({
        User: {
          from: { id: 42 },
          to: { id: 43 }
        }
      });
    });

    test("diff route multiple params", (): void => {
      expect(diffRouteParams(
        [Route.User({ id: 42 }), Route.Search({ term: "A" })],
        [Route.User({ id: 43 }), Route.Search({ term: "B" })])
      ).toEqual({
        User: {
          from: { id: 42 },
          to: { id: 43 }
        },
        Search: {
          from: { term: "A" },
          to: { term: "B" }
        }
      });
    });

    test("diff route with null target", (): void => {
      expect(diffRoute(null, [Route.User({ id: 43 })])).toEqual({});
    });

    test("diff route with null source", (): void => {
      expect(diffRoute([Route.User({ id: 43 })], null)).toEqual({ User: Route.User({ id: 43 }) });
    });

    test("diff route params with nested params", (): void => {
      expect(
        diffRouteParams([Route.User({ data: { id: 42 } })], [Route.User({ data: { id: 43 } })])
      ).toEqual({ User: { from: { data: { id: 42 } }, to: { data: { id: 43 } } } });
    });

    test("no diff route params with nested params", (): void => {
      expect(
        diffRouteParams([Route.User({ data: { id: 42 } })], [Route.User({ data: { id: 42 } })])
      ).toEqual({});
    });
  });

  describe("routeTransition", (): void => {
    test("route transition segment", (): void => {
      expect(routeTransition([Route.Home()], [Route.About()])).toEqual({
        leave: { Home: Route.Home() },
        arrive: { About: Route.About() },
        params: {}
      });
    });

    test("route transition params", (): void => {
      expect(
        routeTransition([Route.User({ id: 42 })], [Route.User({ id: 43 })])
      ).toEqual({
        leave: {},
        arrive: {},
        params: {
          User: {
            from: { id: 42 },
            to: { id: 43 }
          }
        }
      });
    });

    test("route transition with nested params", (): void => {
      expect(
        routeTransition(
          [Route.User({ data: { id: 42 } })],
          [Route.User({ data: { id: 43 } })]
        )
      ).toEqual({
        leave: {},
        arrive: {},
        params: {
          User: {
            from: { data: { id: 42 } },
            to: { data: { id: 43 } }
          }
        }
      });
    });

    test("route transition with multiple params", (): void => {
      expect(
        routeTransition(
          [Route.User({ data: { id: 42 } }), Route.Search({ term: "A" })],
          [Route.User({ data: { id: 43 } }), Route.Search({ term: "B" })]
        )
      ).toEqual({
        leave: {},
        arrive: {},
        params: {
          User: {
            from: { data: { id: 42 } },
            to: { data: { id: 43 } }
          },
          Search: {
            from: { term: "A" },
            to: { term: "B" }
          }
        }
      });
    });

    test("no route transition with nested params", (): void => {
      expect(
        routeTransition(
          [Route.User({ data: { id: 42 } })],
          [Route.User({ data: { id: 42 } })]
        )
      ).toEqual({
        leave: {},
        arrive: {},
        params: {}
      });
    });
  });

  describe("whenPresent", (): void => {
    const duck = { sound: "quack", color: "yellow" };

    test("whenPresent true", (): void => {
      expect(whenPresent(duck.sound, (sound): string => sound.toUpperCase())).toEqual("QUACK");
    });
    test("whenPresent false", (): void => {
      expect(whenPresent(duck["other"], (): string => "fail")).toBeNull();
    });
  });

  describe("Routing", (): void => {
    const routing = Routing([Route.User({ id: 42 }), Route.Profile()]);

    test("routing local segment", (): void => {
      expect(routing.localSegment).toEqual(Route.User({ id: 42 }));
    });
    test("routing child segment", (): void => {
      expect(routing.childSegment).toEqual(Route.Profile());
    });
    test("no child segment", (): void => {
      expect(Routing([Route.Home()]).childSegment).toEqual({ id: "", params: {} });
    });
  });

  describe("routing.next", (): void => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 }), Route.Profile()]);
    const next = routing.next();

    test("next local segment", (): void => {
      expect(next.localSegment).toEqual(Route.User({ id: 42 }));
    });
    test("next child segment", (): void => {
      expect(next.childSegment).toEqual(Route.Profile());
    });
    test("no next child segment", (): void => {
      expect(next.next().childSegment).toEqual({ id: "", params: {} });
    });
  });

  describe("parentRoute", (): void => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    test("parent route", (): void => {
      expect(next.parentRoute()).toEqual([Route.Home()]);
    });
  });

  describe("childRoute", (): void => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    test("routing child route", (): void => {
      expect(routing.childRoute(Route.User({ id: 43 }))).toEqual([
        Route.Home(),
        Route.User({ id: 43 })
      ]);
    });

    test("next child route", (): void => {
      expect(next.childRoute(Route.Profile())).toEqual([
        Route.Home(),
        Route.User({ id: 42 }),
        Route.Profile()
      ]);
    });
  });

  describe("siblingRoute", (): void => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    test("routing sibling route", (): void => {
      expect(routing.siblingRoute(Route.About())).toEqual([Route.About()]);
    });
    test("next sibling route", (): void => {
      expect(next.siblingRoute(Route.About())).toEqual([Route.Home(), Route.About()]);
    });
  });

  describe("sameRoute one", (): void => {
    const routing = Routing([Route.Home()]);

    test("routing same route", (): void => {
      expect(routing.sameRoute({ id: 43 })).toEqual([Route.Home({ id: 43 })]);
    });
  });

  describe("sameRoute two", (): void => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    test("routing same route", (): void => {
      expect(routing.sameRoute({ id: 43 })).toEqual([
        Route.Home({ id: 43 }),
        Route.User({ id: 42 })
      ]);
    });
    test("next same route", (): void => {
      expect(next.sameRoute({ id: 43 })).toEqual([Route.Home(), Route.User({ id: 43 })]);
    });
  });

  describe("sameRoute three", (): void => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 }), Route.Profile()]);
    const next = routing.next();

    test("routing same route", (): void => {
      expect(routing.sameRoute({ id: 43 })).toEqual([
        Route.Home({ id: 43 }),
        Route.User({ id: 42 }),
        Route.Profile()
      ]);
    });
    test("next same route", (): void => {
      expect(next.sameRoute({ id: 43 })).toEqual([
        Route.Home(),
        Route.User({ id: 43 }),
        Route.Profile()
      ]);
    });
  });

  describe("Actions and navigateTo", (): void => {
    test("navigateTo [route]", (): void => {
      expect(navigateTo([Route.Home()])).toEqual({ route: [Route.Home()] });
    });

    test("navigateTo route", (): void => {
      expect(navigateTo(Route.Login())).toEqual({ route: [Route.Login()] });
    });

    test("Actions navigateTo", (): void => {
      let received = null;

      const update = (rcvd: any): void => {
        received = rcvd;
      };

      const actions = Actions(update);

      actions.navigateTo([Route.Home()]);
      expect(received).toEqual({ route: [Route.Home()] });

      actions.navigateTo(Route.Login());
      expect(received).toEqual({ route: [Route.Login()] });
    });
  });
});

describe("routeHelper", (): void => {
  describe("findPathParams", (): void => {
    test("findPathParams empty", (): void => {
      expect(findPathParams("/home")).toEqual([]);
    });

    test("findPathParams one", (): void => {
      expect(findPathParams("/user/:id")).toEqual(["id"]);
    });

    test("findPathParams two", (): void => {
      expect(findPathParams("/user/:id/setting/:setting")).toEqual(["id", "setting"]);
    });

    test("findPathParams with queryParams", (): void => {
      expect(findPathParams("/user/:id?page")).toEqual(["id"]);
    });
  });

  describe("findQueryParams", (): void => {
    test("findQueryParams empty", (): void => {
      expect(findQueryParams("/home")).toEqual([]);
    });

    test("findQueryParams one", (): void => {
      expect(findQueryParams("/user?id")).toEqual(["id"]);
    });

    test("findQueryParams two with ? ?", (): void => {
      expect(findQueryParams("/user/:id?setting?page")).toEqual(["setting", "page"]);
    });

    test("findQueryParams two with ? &", (): void => {
      expect(findQueryParams("/user/:id?setting&page")).toEqual(["setting", "page"]);
    });

    test("findQueryParams two with & &", (): void => {
      expect(findQueryParams("/user/:id&setting&page")).toEqual(["setting", "page"]);
    });
  });

  describe("setParams", (): void => {
    test("setParams none", (): void => {
      expect(setParams("/home", { id: 42 })).toEqual("/home");
    });

    test("setParams one", (): void => {
      expect(setParams("/user/:id", { id: 42 })).toEqual("/user/42");
    });

    test("setParams two", (): void => {
      expect(setParams("/user/:id/setting/:setting", { id: 42, setting: "email" })).toEqual(
        "/user/42/setting/email"
      );
    });

    test("setParams encoded", (): void => {
      expect(setParams("/profile/:username", { username: "Fox Donut" })).toEqual(
        "/profile/Fox%20Donut"
      );
    });

    test("setParams with queryString", (): void => {
      expect(setParams("/search/:id?page", { id: 42, page: 2 })).toEqual("/search/42");
    });
  });

  describe("convertToPath", (): void => {
    test("convertToPath", (): void => {
      expect(convertToPath(routeConfig1, [Route.Home()])).toEqual("/");
    });

    test("convertToPath params", (): void => {
      expect(convertToPath(routeConfig1, [Route.User({ id: 42 })])).toEqual("/user/42");
    });

    test("convertToPath params child", (): void => {
      expect(convertToPath(routeConfig1, [Route.User({ id: 42 }), Route.Profile()])).toEqual(
        "/user/42/profile"
      );
    });

    test("convertToPath with queryString", (): void => {
      expect(
        convertToPath(routeConfig2, [Route.Search({ id: 42, page: 2 })], queryString.stringify)
      ).toEqual("/search/42?page=2");
    });

    test("convertToPath with queryString multiple", (): void => {
      expect(
        convertToPath(
          routeConfig2,
          [
            Route.Search({ id: 42, page: 2, sort: "asc" }),
            Route.Details({ type: "author", filter: "recent" })
          ],
          queryString.stringify
        )
      ).toEqual("/search/42/details/author?filter=recent&page=2&sort=asc");
    });

    test("convertToPath with parent params", (): void => {
      expect(convertToPath(routeConfig3, [Route.Beverage({ id: 42 }), Route.Brewer()])).toEqual(
        "/beverage/42/brewer"
      );
    });

    test("convertToPath only params from parent should be considered", (): void => {
      expect(
        convertToPath(routeConfig3, [Route.Beverage({ id: 42 }), Route.Brewer({ id: 43 })])
      ).toEqual("/beverage/42/brewer");
    });

    test("convertToPath with Mithril catchall route", (): void => {
      expect(convertToPath(routeConfig4, [Route.Invalid({ 404: "invalid" })])).toEqual("/");
    });
  });

  describe("createRouteMap", (): void => {
    test("createRouteMap", (): void => {
      const routeMap = createRouteMap(routeConfig1);

      expect(routeMap["/"]()).toEqual([Route.Home()]);

      expect(routeMap["/user/:id"]({ id: 42 })).toEqual([Route.User({ id: 42 })]);

      expect(routeMap["/user/:id/profile"]({ id: 42 })).toEqual([
        Route.User({ id: 42 }),
        Route.Profile()
      ]);
    });

    test("createRouteMap with queryString", (): void => {
      const routeMap = createRouteMap(routeConfig2);

      expect(routeMap["/search/:id"]({ id: 42, page: 2 })).toEqual([
        Route.Search({ id: 42, page: 2 })
      ]);

      expect(
        routeMap["/search/:id/details/:type"]({
          id: 42,
          page: 2,
          type: "author",
          sort: "asc",
          filter: "recent"
        })
      ).toEqual([
        Route.Search({ id: 42, page: 2, sort: "asc" }),
        Route.Details({ type: "author", filter: "recent" })
      ]);
    });

    test("createRouteMap with parent params", (): void => {
      const routeMap = createRouteMap(routeConfig3);

      expect(routeMap["/beverage/:id/brewer"]({ id: 42 })).toEqual([
        Route.Beverage({ id: 42 }),
        Route.Brewer({ id: 42 })
      ]);
    });
  });

  describe("createRouter", (): void => {
    const getPath = (): string => "#/user/43";
    const setPath = (path): void => {
      expect(path).toEqual("#/about");
    };
    const addLocationChangeListener = (): void => {};

    test("createFeatherRouter", (): void => {
      const router1a = createFeatherRouter({
        createRouteMatcher,
        routeConfig: routeConfig1,
        getPath,
        setPath,
        addLocationChangeListener
      });

      expect(router1a.initialRoute).toEqual([Route.User({ id: "43" })]);

      expect(router1a.toPath([Route.User({ id: 42 })])).toEqual("#/user/42");
      expect(router1a.toPath(Route.User({ id: 42 }))).toEqual("#/user/42");

      expect(router1a.parsePath("#/user/42/profile")).toEqual([
        Route.User({ id: "42" }),
        Route.Profile({})
      ]);

      expect(router1a.toPath(Route.User({ id: "Fox Donut" }))).toEqual("#/user/Fox%20Donut");

      expect(router1a.parsePath("#/user/Fox%20Donut")).toEqual([Route.User({ id: "Fox Donut" })]);

      router1a.locationBarSync([Route.About()]);
      router1a.start({ navigateTo: (): void => {} });
    });

    test("createRouter router.routeMap", (): void => {
      const router1b = createRouter({ routeConfig: routeConfig1, getPath });

      expect(router1b.routeMap["/user/:id/profile"]({ id: 42 })).toEqual([
        Route.User({ id: 42 }),
        Route.Profile()
      ]);
    });

    test("parsePath with queryString", (): void => {
      const router2 = createFeatherRouter({
        createRouteMatcher,
        queryString,
        routeConfig: routeConfig2,
        getPath,
        setPath
      });

      expect(router2.parsePath("#/search/42/details/author?filter=recent&page=2&sort=asc")).toEqual(
        [
          Route.Search({ id: "42", page: "2", sort: "asc" }),
          Route.Details({ type: "author", filter: "recent" })
        ]
      );
    });

    test("createUrlMapperRouter parsePath with parent params", (): void => {
      const router3 = createUrlMapperRouter({
        Mapper,
        routeConfig: routeConfig3,
        getPath,
        setPath
      });

      expect(router3.parsePath("#/beverage/42/brewer")).toEqual([
        Route.Beverage({ id: "42" }),
        Route.Brewer({ id: "42" })
      ]);

      expect(router3.parsePath("#/beverage/Lager%20Or%20Ale")).toEqual([
        Route.Beverage({ id: "Lager Or Ale" })
      ]);
    });
  });
});
