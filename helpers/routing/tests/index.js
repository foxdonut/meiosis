const test = require("tape");

const routing = require("../dist/meiosis-routing");
const createRouteMatcher = require("feather-route-matcher");
const queryString = require("query-string");

const {
  createRouteSegments,
  findRouteSegment,
  findRouteSegmentWithParams,
  diffRoute,
  routeTransition,
  Routing
} = routing.state;

const {
  findPathParams,
  findQueryParams,
  setParams,
  convertToPath,
  createRouteMap,
  createRouter
} = routing.routerHelper;

const Route = createRouteSegments([
  "Home",
  "Login",
  "User",
  "Profile",
  "About",
  "Search",
  "Details",
  "Beverage",
  "Brewer"
]);

test("state", t => {
  t.test("createRouteSegments", t => {
    t.deepEqual(Route.Home(), { id: "Home", params: {} }, "route segment");
    t.deepEqual(
      Route.Login({ returnTo: "Home" }),
      { id: "Login", params: { returnTo: "Home" } },
      "route segment with params"
    );
    t.end();
  });

  t.test("findSegmentRoute", t => {
    const route = [Route.User({ id: 42 }), Route.Profile()];

    t.deepEqual(findRouteSegment(route, "Profile"), { id: "Profile", params: {} }, "found route");

    t.deepEqual(
      findRouteSegment(route, Route.User()),
      { id: "User", params: { id: 42 } },
      "found route segment"
    );

    t.ok(findRouteSegment(route, Route.About()) == null, "should be no found route");

    t.end();
  });

  t.test("findRouteSegmentWithParams", t => {
    const route = [Route.User({ id: 42 }), Route.Profile()];

    t.deepEqual(
      findRouteSegmentWithParams(route, Route.User({ id: 42 })),
      Route.User({ id: 42 }),
      "found route segment with params"
    );

    t.ok(
      findRouteSegmentWithParams(route, Route.User({ id: 43 })) == null,
      "should be no found route segment"
    );

    t.deepEqual(
      findRouteSegmentWithParams(
        [Route.User({ data: { id: 42 } })],
        Route.User({ data: { id: 42 } })
      ),
      Route.User({ data: { id: 42 } }),
      "found route segment with nested params"
    );

    t.end();
  });

  t.test("diffRoute", t => {
    t.deepEqual(diffRoute([Route.Home()], [Route.About()]), [Route.Home()], "diff route");

    t.deepEqual(
      diffRoute([Route.User({ id: 42 })], [Route.User({ id: 43 })]),
      [Route.User({ id: 42 })],
      "diff route"
    );

    t.deepEqual(
      diffRoute([Route.User({ data: { id: 42 } })], [Route.User({ data: { id: 43 } })]),
      [Route.User({ data: { id: 42 } })],
      "diff route with nested params"
    );

    t.deepEqual(
      diffRoute([Route.User({ data: { id: 42 } })], [Route.User({ data: { id: 42 } })]),
      [],
      "no diff route with nested params"
    );

    t.end();
  });

  t.test("routeTransition", t => {
    t.deepEqual(
      routeTransition([Route.Home()], [Route.About()]),
      { leave: [Route.Home()], arrive: [Route.About()] },
      "route transition"
    );

    t.deepEqual(
      routeTransition([Route.User({ id: 42 })], [Route.User({ id: 43 })]),
      { leave: [Route.User({ id: 42 })], arrive: [Route.User({ id: 43 })] },
      "route transition"
    );

    t.deepEqual(
      routeTransition([Route.User({ data: { id: 42 } })], [Route.User({ data: { id: 43 } })]),
      { leave: [Route.User({ data: { id: 42 } })], arrive: [Route.User({ data: { id: 43 } })] },
      "route transition with nested params"
    );

    t.deepEqual(
      routeTransition([Route.User({ data: { id: 42 } })], [Route.User({ data: { id: 42 } })]),
      { leave: [], arrive: [] },
      "no route transition with nested params"
    );

    t.end();
  });

  t.test("Routing", t => {
    const routing = Routing([Route.User({ id: 42 }), Route.Profile()]);

    t.deepEqual(routing.localSegment, Route.User({ id: 42 }), "routing local segment");
    t.deepEqual(routing.childSegment, Route.Profile(), "routing child segment");
    t.deepEqual(Routing([Route.Home()]).childSegment, {}, "no child segment");

    t.end();
  });

  t.test("routing.next", t => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 }), Route.Profile()]);
    const next = routing.next();

    t.deepEqual(next.localSegment, Route.User({ id: 42 }), "next local segment");
    t.deepEqual(next.childSegment, Route.Profile(), "next child segment");
    t.deepEqual(next.next().childSegment, {}, "no next child segment");

    t.end();
  });

  t.test("parentRoute", t => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    t.deepEqual(next.parentRoute(), [Route.Home()], "parent route");

    t.end();
  });

  t.test("childRoute", t => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    t.deepEqual(
      next.childRoute(Route.Profile()),
      [Route.Home(), Route.User({ id: 42 }), Route.Profile()],
      "child route"
    );

    t.deepEqual(
      routing.childRoute(Route.User({ id: 43 })),
      [Route.Home(), Route.User({ id: 43 })],
      "child route"
    );

    t.end();
  });

  t.test("siblingRoute", t => {
    const routing = Routing([Route.Home(), Route.User({ id: 42 })]);
    const next = routing.next();

    t.deepEqual(next.siblingRoute(Route.About()), [Route.Home(), Route.About()], "sibling route");
    t.deepEqual(routing.siblingRoute(Route.About()), [Route.About()], "sibling route");

    t.end();
  });
});

test("routerHelper", t => {
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

  t.test("findPathParams", t => {
    t.deepEqual(findPathParams("/home"), [], "findPathParams empty");
    t.deepEqual(findPathParams("/user/:id"), ["id"], "findPathParams one");

    t.deepEqual(
      findPathParams("/user/:id/setting/:setting"),
      ["id", "setting"],
      "findPathParams two"
    );

    t.deepEqual(findPathParams("/user/:id?page"), ["id"], "findPathParams with queryParams");

    t.end();
  });

  test("findQueryParams", t => {
    t.deepEqual(findQueryParams("/home"), [], "findQueryParams empty");
    t.deepEqual(findQueryParams("/user?id"), ["id"], "findQueryParams one");

    t.deepEqual(
      findQueryParams("/user/:id?setting?page"),
      ["setting", "page"],
      "findQueryParams two"
    );

    t.end();
  });

  t.test("setParams", t => {
    t.deepEqual(setParams("/home", { id: 42 }), "/home", "setParams none");
    t.deepEqual(setParams("/user/:id", { id: 42 }), "/user/42", "setParams one");
    t.deepEqual(
      setParams("/user/:id/setting/:setting", { id: 42, setting: "email" }),
      "/user/42/setting/email",
      "setParams two"
    );

    t.end();
  });

  t.test("setParams with queryString", t => {
    t.deepEqual(
      setParams("/search/:id?page", { id: 42, page: 2 }),
      "/search/42",
      "setParams with queryString"
    );

    t.end();
  });

  t.test("convertToPath", t => {
    t.equal(convertToPath(routeConfig1, [Route.Home()]), "/", "convertToPath");
    t.equal(convertToPath(routeConfig1, [Route.User({ id: 42 })]), "/user/42", "convertToPath");

    t.equal(
      convertToPath(routeConfig1, [Route.User({ id: 42 }), Route.Profile()]),
      "/user/42/profile",
      "convertToPath"
    );

    t.end();
  });

  t.test("convertToPath with queryString", t => {
    t.deepEqual(
      convertToPath(routeConfig2, [Route.Search({ id: 42, page: 2 })], queryString.stringify),
      "/search/42?page=2",
      "convertToPath with queryString"
    );

    t.deepEqual(
      convertToPath(
        routeConfig2,
        [
          Route.Search({ id: 42, page: 2, sort: "asc" }),
          Route.Details({ type: "author", filter: "recent" })
        ],
        queryString.stringify
      ),
      "/search/42/details/author?filter=recent&page=2&sort=asc",
      "convertToPath with queryString"
    );

    t.end();
  });

  t.test("convertToPath with parent params", t => {
    t.deepEqual(
      convertToPath(routeConfig3, [Route.Beverage({ id: 42 }), Route.Brewer()]),
      "/beverage/42/brewer",
      "convertToPath with parent params"
    );

    // Only the id from Beverage should be considered.
    t.deepEqual(
      convertToPath(routeConfig3, [Route.Beverage({ id: 42 }), Route.Brewer({ id: 43 })]),
      "/beverage/42/brewer",
      "convertToPath with parent params"
    );

    t.end();
  });

  t.test("createRouteMap", t => {
    const routeMap = createRouteMap(routeConfig1);

    t.deepEqual(routeMap["/"](), [Route.Home()], "createRouteMap");
    t.deepEqual(routeMap["/user/:id"]({ id: 42 }), [Route.User({ id: 42 })], "createRouteMap");

    t.deepEqual(
      routeMap["/user/:id/profile"]({ id: 42 }),
      [Route.User({ id: 42 }), Route.Profile()],
      "createRouteMap"
    );

    t.end();
  });

  t.test("createRouteMap with queryString", t => {
    const routeMap = createRouteMap(routeConfig2);

    t.deepEqual(
      routeMap["/search/:id"]({ id: 42, page: 2 }),
      [Route.Search({ id: 42, page: 2 })],
      "createRouteMap with queryString"
    );

    t.deepEqual(
      routeMap["/search/:id/details/:type"]({
        id: 42,
        page: 2,
        type: "author",
        sort: "asc",
        filter: "recent"
      }),
      [
        Route.Search({ id: 42, page: 2, sort: "asc" }),
        Route.Details({ type: "author", filter: "recent" })
      ],
      "createRouteMap with queryString"
    );

    t.end();
  });

  t.test("createRouteMap with parent params", t => {
    const routeMap = createRouteMap(routeConfig3);

    t.deepEqual(
      routeMap["/beverage/:id/brewer"]({ id: 42 }),
      [Route.Beverage({ id: 42 }), Route.Brewer({ id: 42 })],
      "createRouteMap with parent params"
    );

    t.end();
  });

  t.test("createRouter", t => {
    t.plan(7);

    const createParsePath = (routeMap, defaultRoute) => {
      const routeMatcher = createRouteMatcher(routeMap);

      const parsePath = (path, queryParams) => {
        const match = routeMatcher(path);

        if (match) {
          return match.page(Object.assign({}, match.params, queryParams));
        } else {
          return defaultRoute;
        }
      };
      return parsePath;
    };

    const getPath = () => "#/user/43";
    const setPath = path => {
      t.equal(path, "#/about");
    };
    const addLocationChangeListener = () => null;

    const router1a = createRouter({
      createParsePath,
      routeConfig: routeConfig1,
      getPath,
      setPath,
      addLocationChangeListener
    });

    t.deepEqual(router1a.initialRoute, [Route.User({ id: "43" })], "initial route");

    t.equal(router1a.toPath([Route.User({ id: 42 })]), "#/user/42", "toPath");

    t.deepEqual(
      router1a.parsePath("#/user/42/profile"),
      [Route.User({ id: "42" }), Route.Profile({})],
      "parsePath"
    );

    router1a.locationBarSync([Route.About()]);
    router1a.start({ navigateTo: () => null });

    const router1b = createRouter({ routeConfig: routeConfig1 });

    t.deepEqual(
      router1b.routeMap["/user/:id/profile"]({ id: 42 }),
      [Route.User({ id: 42 }), Route.Profile()],
      "router.routeMap"
    );

    const router2 = createRouter({
      createParsePath,
      queryString,
      routeConfig: routeConfig2,
      getPath,
      setPath
    });

    t.deepEqual(
      router2.parsePath("#/search/42/details/author?filter=recent&page=2&sort=asc"),
      [
        Route.Search({ id: "42", page: "2", sort: "asc" }),
        Route.Details({ type: "author", filter: "recent" })
      ],
      "parsePath with queryString"
    );

    const router3 = createRouter({
      createParsePath,
      routeConfig: routeConfig3,
      getPath,
      setPath
    });

    t.deepEqual(
      router3.parsePath("#/beverage/42/brewer"),
      [Route.Beverage({ id: "42" }), Route.Brewer({ id: "42" })],
      "parsePath with parent params"
    );

    t.end();
  });
});
