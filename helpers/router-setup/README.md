# meiosis-router-setup

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to popular
demand and for your convenience, here are some reusable snippets of code that help setup and use
Meiosis. This module provides support for setting up a router. Out-of-the-box support is provided
for these router libraries:

- [superouter](https://gitlab.com/harth/superouter)
- [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher)
- [url-mapper](https://github.com/cerebral/url-mapper)
- [Mithril Router](https://mithril.js.org/route.html)

You can also plug in another router library of your choice.

## Installation

Using `npm`:

```
npm i meiosis-router-setup
```

Using a `script` tag:

```
<script src="https://unpkg.com/meiosis-router-setup"></script>
```

Using the `script` tag exposes a `MeiosisRouterSetup` global, under which the helper functions are
provided:

- `createRoutes`
- `createSuperouter`
- `createFeatherRouter`
- `createUrlMapperRouter`
- `createMithrilRouter`

## Using `meiosis-router-setup`

### Create Routes

Meiosis router-setup is based on the idea that a route is a plain objects of the form
`{ id, params }`.

```javascript
{ id: "User", params: { name: "duck" } }
```

For convenience, `meiosis-router-setup` provides the `createRoutes` function to which you specify an
array of strings that correspond to the routes of your application. For each string, you get a
function to create a route, optionally with params:

```javascript
import { createRoutes } from "meiosis-router-setup";

const Route = createRoutes([
  "Home",
  "Login",
  "User",
  "UserProfile",
  "UserPreferences"
]);

Route.Home()
// returns { id: "Home", params: {} }

Route.User({ name: "duck" })
// returns { id: "User", params: { name: "duck" } }
```

### Use Routes

We'll store the current route in the application state, under `route`:

```javascript
{ route: Route.Home() }
```

Then in the `Component`, we can use `routing.localSegment.params` to retrieve any params. Again we
can use a component map, now using `routing.childSegment.id`. We can do this for as many levels as
we want, taking care to pass `routing.next()` down to the child component so that we "advance" the
routing instance:

```javascript
import { Profile, Preferences } from "./our-components";

const componentMap = { Profile, Preferences };

const User = ({ state, routing }) => {
  const params = routing.localSegment.params;
  const Component = componentMap[routing.childSegment.id];

  return (
    <div>
      {/* ... */}
      <Component /* other props... */ routing={routing.next()} />
      {/* ... */}
    </div>
  );
};
```

To navigate to a route, we can use a simple action that updates the state's `route` property:

```javascript
// You can also import { navigateTo } from "meiosis-routing/state"
const navigateTo = route => ({ route });

// You can also import { Actions } from "meiosis-routing/state"
const Actions = update => ({ navigateTo: route => navigateTo(route) });

const update = ...;
const actions = Actions(update);

// ...

<a href="#" onClick={() => actions.navigateTo(
  [Route.User({ id: userId }), Route.Profile()]
)}>
  User Profile
</a>
```

### Create and use a Router

Adding a router gives us the ability to generate paths and put them in the `href` attribute of our
links. The path will show in the browser's location bar, users can use the _back_ and _forward_
buttons, bookmark links, and so on.

What's nice is that we can continue using _programmatic_ routes as we've done so far. Route paths
are generated from routes, so we never have to hardcode paths or mess with them in our application's
routing logic.

#### Route Configuration

First, we create a route configuration. This is a plain object with `id`&rarr;`path` mappings, where
`id` is the id of the route, and `path` is the route path. The route path can include path params
using a colon `:`.

For example:

```javascript
const routeConfig = {
  Home: "/",
  User: "/user/:name",
  UserProfile: "/user/:name/profile",
  Preferences: "/preferences"
}
```

This gives us the following path &rarr; route mappings:

- `/` &rarr; `Route.Home()`
- `/user/:name` &rarr; `Route.User({ name })`
- `/user/:name/profile` &rarr; `Route.UserProfile({ name })`
- `/preferences` &rarr; `Route.Preferences()`

#### Create the Router

Next, we create a router. The router libraries mentioned at the top of the page are supported
out-of-the-box. Let's use `superouter`:

```javascript
import { type as superouter } from "superouter";
import { createSuperouter } from "meiosis-router-helper";

const routeConfig = { ... };

const router = createSuperouter({
  superouter,
  routeConfig,
  defaultRoute: Route.Home()
});
```

#### Use the Router

This gives us a `router` with:

- `router.initialRoute`: the initial route as parsed from the browser's location bar. We can use
  this in our application's initial state, `{ route: router.initialRoute }`
- `router.start`: a function to call at application startup. We pass a `navigateTo` callback for
  route changes: `router.start({ navigateTo: actions.navigateTo })`
- `router.toPath(route)`: converts a route into a path. For example, `router.toPath(Route.Home())`.
- `router.locationBarSync()`: a function to call to keep the location bar in sync. Every time the
  state changes, we call `router.locationBarSync(state.route)`.

Now that we have `router.toPath`, we can use `router.toPath()` in `href`:

```jsx
<a href={router.toPath(Route.User({ name }))}>User</a>
```

#### (Optional) Use Query Strings

We can use query strings by plugging in a query string library such as:

- [query-string](https://github.com/sindresorhus/query-string)
- [qs](https://github.com/ljharb/qs)
- [urlon](https://github.com/cerebral/urlon)

> Note that query strings work out-of-the-box with [Mithril](https://mithril.js.org).

To use a query string library, we just need to specify it as `queryString` when creating the router:

```javascript
import { type as superouter } from "superouter";
import queryString from "query-string";

const routeConfig = { ... };

const router = createSuperouter({
  superouter,
  queryString,
  routeConfig,
  defaultRoute: Route.Home()
});
```

Then, we specify query string parameters in our route configuration using `?` and/or `&`:

```javascript
const routeConfig = {
  Home: "/",
  User: "/user/:name?param1",
  Profile: "/profile?param2&param3"
};
```

The query string parameters will be available in our routes just like path parameters. Conversely,
`toPath(route)` will put parameters into the query string.

## API

[API documentation](https://meiosis.js.org/meiosis-router-setup/modules/_index_.html).

## Credits

Many thanks to [James Forbes](https://github.com/smuemd) for all the brilliant discussions and
inspiration, and for [superouter](https://gitlab.com/harth/superouter).

----

_meiosis-router-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
