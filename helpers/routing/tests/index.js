const test = require("tape");

const routing = require("../dist/meiosis-routing");

const {
  createRoutes,
  findRoute,
  findRouteWithParams,
  diffRoute,
  routeTransition,
  initRoute,
  nextRoute,
  parentRoute,
  childRoute,
  siblingRoute
} = routing.state;

const Route = createRoutes(["Home", "Login", "User", "Profile", "About"]);

test("state", t => {
  t.test("createRoutes", t => {
    t.deepEqual(Route.Home(), { id: "Home", params: {} }, "routing object");
    t.deepEqual(
      Route.Login({ returnTo: "Home" }),
      { id: "Login", params: { returnTo: "Home" } },
      "routing object with params"
    );
    t.end();
  });

  t.test("findRoute", t => {
    const route = [Route.User({ id: 42 }), Route.Profile()];

    t.deepEqual(findRoute(route, "Profile"), { id: "Profile", params: {} }, "found route");
    t.deepEqual(findRoute(route, Route.User()), { id: "User", params: { id: 42 } }, "found route");
    t.ok(findRoute(route, Route.About()) == null, "should be no found route");

    t.end();
  });

  t.test("findRouteWithParams", t => {
    const route = [Route.User({ id: 42 }), Route.Profile()];

    t.deepEqual(
      findRouteWithParams(route, Route.User({ id: 42 })),
      Route.User({ id: 42 }),
      "found route with params"
    );
    t.ok(findRouteWithParams(route, Route.User({ id: 43 })) == null, "should be no found route");

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

  t.test("initRoute", t => {
    const route = initRoute([Route.User({ id: 42 }), Route.Profile()]);

    t.deepEqual(route.local, Route.User({ id: 42 }), "local route");
    t.deepEqual(route.child, Route.Profile(), "route child");
    t.deepEqual(initRoute([Route.Home()]).child, {}, "no route child");

    t.end();
  });

  t.test("nextRoute", t => {
    const route = initRoute([Route.Home(), Route.User({ id: 42 }), Route.Profile()]);
    const next = nextRoute(route);

    t.deepEqual(next.local, Route.User({ id: 42 }), "next local route");
    t.deepEqual(next.child, Route.Profile(), "next route child");
    t.deepEqual(nextRoute(next).child, {}, "no next route child");

    t.end();
  });

  t.test("parentRoute", t => {
    const route = initRoute([Route.Home(), Route.User({ id: 42 })]);
    const next = nextRoute(route);

    t.deepEqual(parentRoute(next), [Route.Home()], "parent route");

    t.end();
  });

  t.test("childRoute", t => {
    const route = initRoute([Route.Home(), Route.User({ id: 42 })]);
    const next = nextRoute(route);

    t.deepEqual(
      childRoute(next, Route.Profile()),
      [Route.Home(), Route.User({ id: 42 }), Route.Profile()],
      "child route"
    );

    t.deepEqual(
      childRoute(route, Route.User({ id: 43 })),
      [Route.Home(), Route.User({ id: 43 })],
      "child route"
    );

    t.end();
  });

  t.test("siblingRoute", t => {
    const route = initRoute([Route.Home(), Route.User({ id: 42 })]);
    const next = nextRoute(route);

    t.deepEqual(siblingRoute(next, Route.About()), [Route.Home(), Route.About()], "sibling route");
    t.deepEqual(siblingRoute(route, Route.About()), [Route.About()], "sibling route");

    t.end();
  });
});
