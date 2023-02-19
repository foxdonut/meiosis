# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@nav-next:router-history-mode.html:History Mode
@docs-nav-end

## Setup / Hash Mode

Let's look at how we can set up `meiosis-router`.

Make sure you have installed it, using
[these instructions](https://github.com/foxdonut/meiosis/tree/master/helpers/router#installation).

To create the router, we need to define a route configuration. This is a simple key-value object
with route paths associated to strings. The strings identify the pages of our application.

Then, we can create the router using `createRouter({ routeConfig })`.

For example:

```js
// router.js
import { createRouter } from 'meiosis-router';

// We are defining constants for convenience, but this is not a requirement.
export const Page = {
  Home: 'Home',
  Login: 'Login',
  User: 'User',
  NotFound: 'NotFound'
};

export const routeConfig = {
  '/': Page.Home,
  '/login': Page.Login,
  '/user/:id': Page.User,
  '/*': Page.NotFound
};

export const router = createRouter({ routeConfig });
```

We defined a `Page` constant for convenience, but this is not strictly necessary. You could use
strings directly in the `routeConfig` object, if you prefer.

The `routeConfig` object defines the route paths and their associated page identifiers.

Notice that we can use a colon, `:`, for path parameters, such as `/user/:id`.

Also notice the last route, `'/*'`, which catches all routes that match none of the others. We can
use this to display a friendly "page not found" message to the user.

Now, we've created and exported `router`, which we can import and use:

```js
// index.js
import { meiosisSetup } from 'meiosis-setup';
import { router } from './router';

const app = {
  initial: {
    route: router.initialRoute
  }
};

const cells = meiosisSetup({ app });
const cell = cells();

router.start((route) => cell.update({ route: () => route }));

cells.map((cell) => {
  router.syncLocationBar(cell.state.route);
});
```

This is a regular Meiosis setup. In our initial application state, we use `router.initialRoute` to
indicate the first `route`.

To respond to route changes and update the `route` in the application state, we use:

```js
router.start((route) => cell.update({ route: () => route }));
```

- The URL in the browser's location bar changes: by clicking on a link, typing in the location bar,
  etc.
- `meiosis-router` listens for these changes and calls the function passed to `start`
- the function updates the route in the application state by calling `cell.update(...)`.

Finally, to keep the browser's location bar in sync with the route when we change the route
programmatically by updating the application state, we use:

```js
cells.map((cell) => {
  router.syncLocationBar(cell.state.route);
});
```

- When the application state changes, `meiosis-router` keeps the browser's location bar in sync with
  the application state route
- Thus, when you change the route programmatically by changing it in the application state with
  `cell.update(...)`, the browser's location bar will automatically change accordingly and
  correspond to the route.

@docs-nav-start
@nav-prev:router-overview.html:Overview
@nav-router-toc
@nav-next:router-history-mode.html:History Mode
@docs-nav-end
