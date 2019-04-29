const test = require("tape");

const routing = require("../dist/meiosis-routing");
const createRouteMatcher = require("feather-route-matcher");

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
  setParams,
  convertToPath,
  createRouteMap,
  createRouter
} = routing.pathUtils;

const Route = createRouteSegments(["Home", "Login", "User", "Profile", "About"]);

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

    t.end();
  });

  t.test("diffRoute", t => {
    t.deepEqual(diffRoute([Route.Home()], [Route.About()]), [Route.Home()], "diff route");

    t.deepEqual(
      diffRoute([Route.User({ id: 42 })], [Route.User({ id: 43 })]),
      [Route.User({ id: 42 })],
      "diff route"
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

test("pathUtils", t => {
  const routeConfig = {
    Home: "/",
    About: "/about",
    User: [
      "/user/:id",
      {
        Profile: "/profile"
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

    t.end();
  });

  t.test("setParams", t => {
    t.deepEqual(setParams("/home", {}), "/home", "setParams none");
    t.deepEqual(setParams("/user/:id", { id: 42 }), "/user/42", "setParams one");
    t.deepEqual(
      setParams("/user/:id/setting/:setting", { id: 42, setting: "email" }),
      "/user/42/setting/email",
      "setParams two"
    );

    t.end();
  });

  t.test("convertToPath", t => {
    t.equal(convertToPath(routeConfig, [Route.Home()]), "/", "convertToPath");
    t.equal(convertToPath(routeConfig, [Route.User({ id: 42 })]), "/user/42", "convertToPath");

    t.equal(
      convertToPath(routeConfig, [Route.User({ id: 42 }), Route.Profile()]),
      "/user/42/profile",
      "convertToPath"
    );

    t.end();
  });

  t.test("createRouteMap", t => {
    const routeMap = createRouteMap(routeConfig);

    t.deepEqual(routeMap["/"](), [Route.Home()], "createRouteMap");
    t.deepEqual(routeMap["/user/:id"]({ id: 42 }), [Route.User({ id: 42 })], "createRouteMap");

    t.deepEqual(
      routeMap["/user/:id/profile"]({ id: 42 }),
      [Route.User({ id: 42 }), Route.Profile()],
      "createRouteMap"
    );

    t.end();
  });

  t.test("createRouter", t => {
    t.plan(3);

    const createParsePath = (routeMap, defaultRoute) => {
      const routeMatcher = createRouteMatcher(routeMap);

      const parsePath = path => {
        const match = routeMatcher(path);

        if (match) {
          return match.page(match.params);
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

    const router1 = createRouter({
      createParsePath,
      routeConfig,
      getPath,
      setPath,
      addLocationChangeListener
    });

    t.equal(router1.toPath([Route.User({ id: 42 })]), "#/user/42", "toPath");

    t.deepEqual(
      router1.parsePath("/user/42/profile"),
      [Route.User({ id: "42" }), Route.Profile({})],
      "parsePath"
    );

    router1.locationBarSync([Route.About()]);

    router1.start({ navigateTo: () => null });

    t.end();
  });
});
