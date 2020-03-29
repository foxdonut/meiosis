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

- `routerSetup.*`

## Using `meiosis-router-setup`

### Create Route Segments

Meiosis router-setup is based on the idea of _route segments_, which are plain objects of the form
`{ id, params }`. Then, a _route_ is an **array** of route segments:

```javascript
[{ id: "User", params: { name: "duck" }, { id: "Profile" } }]
```

Using an array of route segments opens up some nice possibilities:

- Navigating to same, parent, sibling, or child route
- Creating reusable child routes
- Managing pages and transitions independently of route paths

For convenience, `meiosis-router-setup/state` provides the `createRouteSegments` to which you
provide an array of strings that correspond to the route segments of your application:

```javascript
import { createRouteSegments } from "meiosis-router-setup/state";

const Route = createRouteSegments([
  "Home",
  "Login",
  "User",
  "Profile",
  "Preferences"
]);

Route.Home()
// returns { id: "Home", params: {} }

[Route.User({ name: "duck" }), Route.Profile()]
// returns [{ id: "User", params: { name: "duck" } }, { id: "Profile", params: {} }]
```

Now that we can create route segments and routes (arrays of route segments), let's use _routing_ to
manage them.

### Use `Routing`

We'll store the current route in the application state, under `route`:

```javascript
{ route: Route.Home() }
```

We can now render the top-level component according to the `localSegment` id. We can use a simple
`string`&rarr;`Component` map to look up the corresponding component:

```javascript
import { Routing } from "meiosis-router-setup/state";
import { Home, Login, User } from "./our-components";

const componentMap = { Home, Login, User };

const Root = ({ state }) => {
  const routing = Routing(state.route);
  const Component = componentMap[routing.localSegment.id];

  return (
    <div>
      {/* ... */}
      <Component /* other props... */ routing={routing} />
      {/* ... */}
    </div>
  );
};
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

First, we create a route configuration. This is a plain object with `id`&rarr;`config` mappings,
where `id` is the id of the route segment, and `config` can either be:

- a string: the route path
- an array: `[ path, (optional) array of parameters from the parent, nested route config ]`

For example:

```javascript
const routeConfig = {
  Home: "/",
  User: ["/user/:name", {
    Profile: "/profile",
    Preferences: ["/preferences", ["name"]]
  }]
}
```

This gives us the following path &rarr; route mappings:

- `/` &rarr; `[Route.Home()]`
- `/user/:name` &rarr; `[Route.User({ name })]`
- `/user/:name/profile` &rarr; `[Route.User({ name }), Route.Profile()]`
- `/user/:name/preferences` &rarr; `[Route.User({ name }), Route.Profile({ name })]`

#### Create the Router

Next, we create a router. The router libraries mentioned at the top of the page are supported
out-of-the-box. Let's use `feather-route-matcher`:

```javascript
import createRouteMatcher from "feather-route-matcher";
import { createFeatherRouter } from "meiosis-routing/router-helper";

const routeConfig = { ... };

const router = createFeatherRouter({
  createRouteMatcher,
  routeConfig,
  defaultRoute: [Route.Home()]
});
```

#### Use the Router

This gives us a `router` with:

- `router.initialRoute`: the initial route as parsed from the browser's location bar. We can use
  this in our application's initial state, `{ route: router.initialRoute }`
- `router.start()`: a function to call at application startup. We pass a `navigateTo` callback for
  route changes: `router.start({ navigateTo: actions.navigateTo })`
- `router.toPath(route)`: converts a route into a path. For example, `router.toPath([Route.Home()])`
  or a relative route such as `router.toPath(routing.parentRoute())`.
- `router.locationBarSync()`: a function to call to keep the location bar in sync. Every time the
  state changes, we call `router.locationBarSync(state.route)`.

Now that we have `router.toPath`, we no longer need to have `href="#"` and `onClick={...}` in our
links. Instead, we can use `router.toPath()` in `href`:

```jsx
// Say we are in [Route.User({ name }), Route.Profile()].
// This navigates to [Route.User({ name })]
<a href={router.toPath(routing.parentRoute())}>
  User
</a>

// Say we are in [Route.User({ name })].
// This navigates to [Route.User({ name }), Route.Profile()]
<a href={router.toPath(routing.childRoute(Route.Profile()))}>
  Profile
</a>

// Say we are in [Route.User({ name }), Route.Profile()].
// This navigates to [Route.User({ name }), Route.Preferences({ name })]
// Notice that we don't have to specify ({ name }) in Route.Preferences(),
// since it is a parameter that is inherited from the parent route segment.
<a href={router.toPath(routing.siblingRoute(Route.Preferences()))}>
  Preferences
</a>

// Say we are in [Route.User({ name: "name1" })].
// This navigates to [Route.User({ name: "name2" })]
<a href={router.toPath(routing.sameRoute({ name: "name2" }))}>
  Profile
</a>
```

#### (Optional) Use Query Strings

We can use query strings by plugging in a query string library such as:

- [query-string](https://github.com/sindresorhus/query-string)
- [qs](https://github.com/ljharb/qs)
- [urlon](https://github.com/cerebral/urlon)

> Note that query strings work out-of-the-box with [Mithril](https://mithril.js.org).
Refer to the [routing tutorial](https://meiosis.js.org/docs/routing.html) for information on using
`meiosis-routing` with Mithril.

To use a query string library, we just need to specify it as `queryString` when creating the router:

```javascript
import createRouteMatcher from "feather-route-matcher";
import qs from "qs";

const router = createFeatherRouter({
  createRouteMatcher,
  queryString: qs,
  routeConfig,
  defaultRoute: [Route.Home()]
});
```

Then, we specify query string parameters in our route configuration using `?` and/or `&`:

```javascript
const routeConfig = {
  Home: "/",
  User: ["/user/:name?param1", {
    Profile: "/profile?param2&param3",
    Preferences: ["/preferences", ["name"]]
  }]
};
```

The parameters will be available in our route segments just like path parameters.

### Use Transitions

It's often desirable to load data when arriving at a route, clear data when leaving a route, guard a
route to restrict access, and so on. We can do them with route _transitions_.

`meiosis-routing` provides a `routeTransition` function that takes the previous and current route
state and returns a route transition object, `{ leave: {...}, arrive: {...} }`. You can use this
function in a [service function](http://meiosis.js.org/docs/services.html#using_meiosis_setup), in a
Redux reducer, and so on.

As a service function, it looks like this:

```javascript
const service = ({ previousState, state }) => ({
  state: { routeTransition: () => routeTransition(previousState.route, state.route) }
});
```

With this, `state.routeTransition` will contain `leave` and `arrive` properties with the routes that
we left and arrived to, keyed by route id. We can then use this to perform any actions we want when
leaving from or arriving to a route:

```javascript
// in service function, reducer, etc.

function loadDataForUser(state) {
  if (state.routeTransition.arrive.User) {
    const name = state.routeTransition.arrive.User.params.name;
    // load data for user according to the value of 'name'...
  }
}

function cleanup(state) {
  if (state.routeTransition.leave.User) {
    // leaving User route segment, cleanup...
  }
}
```

### For More Details

As mentioned above, you will find a more in-depth tutorial in the
[Meiosis Routing documentation](https://meiosis.js.org/docs/routing.html).

More details are also available in the
[API documentation](https://meiosis.js.org/meiosis-routing/modules/_index_.html).

## Credits

Many thanks to [James Forbes](https://github.com/smuemd) for all the brilliant discussions and
inspiration, and for [superouter](https://gitlab.com/harth/superouter).

----

_meiosis-router-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._

