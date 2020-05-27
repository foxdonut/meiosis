# meiosis-router-setup

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to popular
demand and for your convenience, here are some reusable snippets of code that help setup and use
Meiosis. This module provides support for setting up a router. Out-of-the-box support is provided
for these router libraries:

- [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher)
- [Mithril Router](https://mithril.js.org/route.html)

## Installation

Using `npm`:

```
npm i meiosis-router-setup
```

Using a `script` tag:

```
<script src="https://unpkg.com/meiosis-router-setup"></script>
```

Using the `script` tag exposes a `MeiosisRouter` global, under which the helper functions are
provided:

- `createFeatherRouter`
- `createMithrilRouter`

## Route Configuration

To configure your routes, use a plain object with the paths and a corresponding string page ID. Use
the `:` prefix for path parameters:

```javascript
const routeConfig = {
  "/": "Home",
  "/login": "Login",
  "/user/:id": "UserProfile"
};
```

You'll likely want to use string constants instead of hard-coded strings:

```javascript
const Route = {
  Home: "Home",
  Login: "Login",
  UserProfile: "UserProfile"
};

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/user/:id": Route.UserProfile
};
```

## Usage with Feather Route Matcher

To use [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher), you of
course need to install it:

```
npm i feather-route-matcher
```

Then, use `createFeatherRouter` to create the router:

```javascript
import createRouteMatcher from "feather-route-matcher";
import { createFeatherRouter } from "meiosis-router-setup";

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/user/:id": Route.UserProfile
};

const router = createFeatherRouter({ createRouteMatcher, routeConfig });
```

To add query string support, add a query string library. The following work out-of-the-box:

- [query-string](https://github.com/sindresorhus/query-string)
- [qs](https://github.com/ljharb/qs)
- [urlon](https://github.com/cerebral/urlon)

Use the `queryString` parameter to specify the query string library. For example:

```javascript
import createRouteMatcher from "feather-route-matcher";
import { createFeatherRouter } from "meiosis-router-setup";
import queryString from "query-string";

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/user/:id": Route.UserProfile
};

const router = createFeatherRouter({ createRouteMatcher, queryString, routeConfig });
```

Now, `router` provides the `initialRoute` property containing the initial route. Use this to
initialize your application state. Then, start the router by calling `start` and providing a
function that gets called when the route changes:

```javascript
router.start(route => update({ route: () => route }));
```

Normally the function that you provide should call `update` to update the state with the route,
using a patch that corresponds to your Meiosis setup
([Mergerino](http://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html),
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html), ...).
The example above uses Mergerino.

Next, move on to [Basic Usage](#basic-usage).

## Usage with Mithril Router

To use [Mithril Router](https://mithril.js.org/route.html), since you are already using Mithril for
your application, there is no need to install any other dependency. Moreover, query string support
is automatically provided.

Use `createMithrilRouter` to create the router:

```javascript
import m from "m";
import { createMithrilRouter } from "meiosis-router-setup";

const routeConfig = {
  "/": Route.Home,
  "/login": Route.Login,
  "/user/:id": Route.UserProfile
};

const router = createMithrilRouter({ m, routeConfig });
```

Then, use [m.route](https://mithril.js.org/route.html#routeroot,-defaultroute,-routes) and
`router.createMithrilRoutes` to set up your application. Pass your `App` (root view component),
`states`, `update` and/or `actions` (from your Meiosis setup), and an `onRouteChange` function.
The latest state (by calling `states()`), `update`, and `actions` will be passed to your `App`.

```javascript
m.route(
  document.getElementById("app"),
  "/",
  router.createMithrilRoutes({ App, states, update, actions,
    onRouteChange: route => update({ route: () => route })
  })
);
```

The `onRouteChange` function is called with the `route` whenever the route changes. Normally the
function that you provide should call `update` to update the state with the route, using a patch
that corresponds to your Meiosis setup
([Mergerino](http://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html),
[Function Patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html), ...).
The example above uses Mergerino.

## Basic Usage

The router produces route objects of the form `{ page: "PageId", params: {...} }`, where `page` is
the page ID that corresponds to the route that you specified in your `routeConfig` (`"Home"`,
`"Login"`, `"UserProfile"`, etc.) and `params` are the path parameters. If you are using query
string support, query string parameters are located under `params.queryParams`.

With the `onRouteChange` function that we provided when setting up the router, `update` will be
called whenever the route changes, and we can access the route under the `route` property of the
application state. Then, we can use `state.route.page` to determine the current page,
`state.route.params` to get the path parameters, and `state.route.params.queryParams` for the query
string parameters.

To keep the location bar in sync, namely when programmatically changing the route, there are two
options: The first option is to use `router.locationBarSync`:

```javascript
states.map(state => router.locationBarSync(state.route));
```

The second option is, if you are already using
[effects](http://meiosis.js.org/docs/services-and-effects.html), to add `router.effect` to your
array of effects:

```javascript
const app = {
  ...,
  Effects: update => [
    your.Effect(update),
    ...,
    router.effect
  ]
};
```

Next, add links to your application. You can either use hard-coded paths, or the `toUrl` function.

## Using Hard-Coded Paths

With this option, you use hard-coded paths in `href`:

```jsx
<a href="#/">Home</a>
<a href="#/login">Login</a>
<a href="#/user/42">User Profile</a>
```

```javascript
m("a", { href: "#/" }, "Home"),
m("a", { href: "#/login" }, "Login"),
m("a", { href: "#/user/42" }, "User Profile")
```

For programmatic routes, use the `router.getRoute` function and omit the hash prefix:

```javascript
update({ route: () => router.getRoute("/") });
update({ route: () => router.getRoute("/login") });
update({ route: () => router.getRoute("/user/42") });
```

For convenience, you can write a helper function:

```javascript
const routeTo = path => ({ route: () => router.getRoute(path) });

update(routeTo("/"));
update(routeTo("/login"));
update(routeTo("/user/42"));
```

Of course, you also can write helper functions to compute the paths. Or, you can use `toUrl` to use
page IDs and parameters instead of hard-coded paths, as shown below.

## Using `toUrl`

With this option, you provide a page ID and the path/query string parameters to obtain the path:

```jsx
<a href={router.toUrl(Route.Home)}>Home</a>
<a href={router.toUrl(Route.Login)}>Login</a>
<a href={router.toUrl(Route.UserProfile, { id: 42 })}>User Profile</a>
```

```javascript
m("a", { href: router.toUrl(Route.Home) }, "Home"),
m("a", { href: router.toUrl(Route.Login) }, "Login"),
m("a", { href: router.toUrl(Route.UserProfile, { id: 42 }), "User Profile")
```

For programmatic routes, use the `router.getRoute` function:

```javascript
update({ route: () => router.getRoute(Route.Home) });
update({ route: () => router.getRoute(Route.Login) });
update({ route: () => router.getRoute(Route.UserProfile, { id: 42 }) });
```

For convenience, you can write a helper function:

```javascript
const routeTo = path => ({ route: () => router.getRoute(path) });

update(routeTo(Route.Home));
update(routeTo(Route.Login));
update(routeTo(Route.UserProfile, { id: 42 }));
```
## API

[API documentation is here.](api.md)

----

_meiosis-router-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
