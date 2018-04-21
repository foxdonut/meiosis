# Meiosis Wiki

[Table of Contents](toc.html)

## Universal Router

[So far](04-Routing-A-url-mapper.html), we've been using [url-mapper](https://github.com/cerebral/url-mapper),
but you are free to use the routing library of your choice. To that point, let's try a
different library, namely [Universal Router](https://www.kriasoft.com/universal-router/).

### Creating Routes

With Universal Router, we can create routes with the same patterns as before, such as
`/beer/:id` for parameters and `/coffee/:id?` for optional parameters. Further, we can
create _nested_ routes by using `children` so that all the child routes are prefixed
with the parent route:

`router.js`
```javascript
export const createRouter = navigation => {
  const wrap = action => ctx => {
    action(ctx.params);
    return true;
  };

  const routes = [
    { path: "/", name: pages.home.id, action: wrap(navigation.navigateToHome) },
    { path: "/coffee/:id?", name: pages.coffee.id, action: wrap(navigation.navigateToCoffee) },
    { path: "/beer", children: [
      { path: "/", name: pages.beer.id, action: wrap(navigation.navigateToBeer) },
      { path: "/:id", name: pages.beerDetails.id, action: wrap(navigation.navigateToBeerDetails) }
    ]}
  ];

  const router = new UniversalRouter(routes);

  const resolveRoute = () => {
    const route = document.location.hash.substring(1);
    router.resolve(route);
  };

  window.onpopstate = resolveRoute;
};
```

As you can see, because each route has its own `action`, we only need to call
`router.resolve(route)` and the action is automatically triggered. Using `children`, we
avoid having to repeat `/beer` three times.

Finally, notice that each route has a `name` property with the page id. We'll use that for
keeping routes in sync.

### Route Sync

In the [previous section](Routing), we wrote a `routeSync` function that determined what
the current route should be based on the page id, and set the browser's location bar to
that route if it did not match. We built a reverse lookup `routeMap` to achieve this.

With Universal Router, we can use a `generateUrls` function to create a function that
produces routes for us. The `name` of each route is used for route lookup. Since we've set
`name` to the page id, we can pass the current page id and parameters to compute the
current route:

`router.js`
```javascript
import generateUrls from "universal-router/generateUrls";

const urlGenerator = generateUrls(router);

const routeSync = model => {
  const route = urlGenerator(model.page.id, model.params || {});
  if (document.location.hash.substring(1) !== route) {
    window.history.pushState({}, "", "#" + route);
  }
};
```

The best part is that we only had to change code in one file, `router.js`, to use a
different routing library. The rest of the code works unchanged.

### Principles / Takeaways

- Universal Router supports nested (children) routes and generating routes from route ids.
- You can easily use a different routing library by changing the router code only.
- The rest of the code has no dependency on the routing library and should work without
any changes.

[Table of Contents](toc.html)

-----

Meiosis is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
