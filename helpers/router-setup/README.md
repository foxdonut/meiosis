# meiosis-router-setup

**This is work-in-progress only!**

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to popular
demand and for your convenience, here is a module that helps with setting up a router with Meiosis.

## Principles

- Store the route in the application state
- Use the route in the state to determine which page to render, what data to load, etc.
- Clicking on a link, changing the URL in the location bar, etc. changes the route in the state
- Changing the route in the state programmatically synchronizes the URL in the location bar

_Coming soon_. This is work-in-progress!

> This library sets up a router for you and this document explains how to use it. If you are
interested in more details of how the router works and how you can implement it yourself, see the
[Using a Router](http://meiosis.js.org/docs/using-a-router.html) section of the
[Meiosis Documentation](http://meiosis.js.org/docs/toc.html).

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

- `createRouter`
- `createMithrilRouter`

You will need a third-party router library for parsing URLs. You can use just about any library you
like; examples of libraries that work well are:

- [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher)
- [router5](https://router5.js.org)
- [superouter](https://gitlab.com/harth/superouter)
- [url-mapper](https://github.com/cerebral/url-mapper)

Optionally, if you want to use query strings, add a query string library. The following work
out-of-the-box:

- [query-string](https://github.com/sindresorhus/query-string)
- [qs](https://github.com/ljharb/qs)
- [urlon](https://github.com/cerebral/urlon)

If you are using [Mithril](https://mithril.js.org), special support is provided for
[Mithril Router](https://mithril.js.org/route.html). Note that Mithril Router already supports query
strings, so there is no need for a separate library.

## Route Configuration

To configure your routes, use a plain object with the route path templates and a corresponding
string page ID. Use the `:` prefix for path parameters. For example:

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

## Hardcoded URL Router Setup

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

Use `queryString` to specify the query string library. For example:

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
([Mergerino](http://meiosis.js.org/docs/05-meiosis-with-mergerino.html),
[Function Patches](http://meiosis.js.org/docs/04-meiosis-with-function-patches.html), ...).
The example above uses Mergerino.

Next, move on to [Using the Router](#using-the-router).

## Mithril Router Setup

To use [Mithril Router](https://mithril.js.org/route.html), since you are already using Mithril for
your application, there is no need to install any other dependency. Moreover, query string support
is automatically provided.

Use `createMithrilRouter` to create the router:

```javascript
import m from "mithril";
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
([Mergerino](http://meiosis.js.org/docs/05-meiosis-with-mergerino.html),
[Function Patches](http://meiosis.js.org/docs/04-meiosis-with-function-patches.html), ...).
The example above uses Mergerino.

## Using the Router

The router produces route objects of the form `{ page: "PageId", params: {...} }`, where `page` is
the page ID that corresponds to the route that you specified in your `routeConfig` (`"Home"`,
`"Login"`, `"UserProfile"`, etc.) and `params` are the path parameters, such as `{ id: "42" }`. If
you are using query string support, query string parameters are located under `params.queryParams`.
For example:

```javascript
{
  page: "PageId",
  params: {
    id: "42",
    queryParams: {
      showAll: "true"
    }
  }
}
```

With the `onRouteChange` function that was provided above when setting up the router, `update` will
be called whenever the route changes, and we can access the route under the `route` property of the
application state. Then, we can use `state.route.page` to determine the current page,
`state.route.params` to get the path parameters, and `state.route.params.queryParams` for the query
string parameters.

To keep the location bar in sync, namely when programmatically changing the route, there are two
options.

1) The first option is to use `router.locationBarSync`:

```javascript
states.map(state => router.locationBarSync(state.route));
```

2) The second option, if you are already using
[effects](http://meiosis.js.org/docs/services-and-effects.html), is to add `router.effect` to your
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

## Hash Mode

By default, the router uses _hash mode_. The hash `"#"` in the URL is normally used for _anchor
links_, which look like `<a href="#example">Example</a>`. Setting the URL from `/something` to
`/something#example` jumps to that location on the same page.

> The important thing here is that the browser **stays on the same page** and **does not call the
server** when the hash changes.

We can take advantage of this by using the hash for our routes. The router listens for hash changes
and triggers route updates.

By default, the router uses `#!` as the hash prefix. Using this prefix makes your pages available
for Google search engine indexing and improves your web application's visibility by having your
pages appear in Google search results. It is also a convention to indicate that the hash is being
used for router purposes instead of for linking to anchor tags.

If you prefer to use `#` instead of `#!` as the hash prefix, specify `plainHash: true` when creating
the router:

```javascript
const router = createFeatherRouter({ createRouteMatcher, routeConfig, plainHash: true });

const router = createMithrilRouter({ m, routeConfig, plainHash: true });
```

The following sections assume that you are using the router in hash mode. Following that, we will
see how to use the router in [history mode](#history-mode).

## Adding Links

Next, add links to your application. You can either use hard-coded paths, or the `toUrl` function.

### Using Hard-Coded Paths

With this option, you use hard-coded paths in `href`:

```jsx
<a href="#!/">Home</a>
<a href="#!/login">Login</a>
<a href="#!/user/42">User Profile</a>
```

```javascript
m("a", { href: "#!/" }, "Home"),
m("a", { href: "#!/login" }, "Login"),
m("a", { href: "#!/user/42" }, "User Profile")
```

For programmatic routes, use the `router.getRoute` function and omit the hash-bang (`"#!"`) prefix:

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

Of course, you also can write helper functions to compute the paths.

Instead of using hard-coded paths, you can use `toUrl` with page IDs and parameters, as shown below.

### Using `toUrl`

With this option, you provide a page ID and the path and query string parameters to obtain the path:

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

## History Mode

The router can also operate in _history mode_ instead of hash mode. In history mode, the router uses
plain URLs, such as `/login` and `/user/42`, instead of URLs with a hash such as `#!/login` and
`#!/user/42`.

> The important thing here is that the browser normally **calls the server** when the URL changes,
> and we need to prevent that while navigating within the application. Furthermore, the server must
> support all possible URLs, since the user could paste a URL in the location bar, or press the
> browser's Reload button. Server-side support is outside the scope of this documentation.

To use history mode, specify `historyMode: true` when creating the router:

```javascript
const router = createFeatherRouter({ createRouteMatcher, routeConfig, historyMode: true });

const router = createMithrilRouter({ m, routeConfig, historyMode: true });
```

In history mode, we need to prevent links from calling the server. That can be achieved by calling
`preventDefault` on the click event of the link and push the link onto the history. For convenience,
the router provides a `getLinkHandler` function which does that. To use it, create a `Link`
component that you will use for links. The component calls `router.toUrl(href)` to get the URL, and
uses `router.getLinkHandler(url)` as the `onClick` event handler.

With React or Preact and using hard-coded paths:

```javascript
export const Link = ({ href, children, ...props }) => {
  const url = router.toUrl(href);

  return <a href={url} onClick={router.getLinkHandler(url)} {...props}>{children}</a>;
};

<Link href="/login">Login</Link>
```

Using page IDs:

```javascript
export const Link = ({ page, params, children, ...props }) => {
  const url = router.toUrl(attrs.page, attrs.params);

  return <a href={url} onClick={router.getLinkHandler(url)} {...props}>{children}</a>;
};

<Link page={Route.UserProfile} params={{ id: 42 }}>User Profile</Link>
```

With Mithril Router, you can simply use Mithril's `m.route.Link`:

```javascript
export const Link = m.route.Link;

m(Link, { href: router.toUrl(Route.UserProfile, { id: 42 }) }, "User Profile"))
```

## Using Services and Effects

## Examples

See the examples under the **Using a Router** section of the
[Meiosis Documentation Examples](http://meiosis.js.org/docs-examples.html).


The [realworld example](http://meiosis.js.org/examples/realworld/index.html) also uses this router
pattern.

## API

[API documentation is here.](api.md)

----

_meiosis-router-setup is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
