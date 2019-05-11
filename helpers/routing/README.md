# meiosis-routing

[Meiosis](https://meiosis.js.org) is a pattern, not a library. Nevertheless, in response to
popular demand and for your convenience, here are some reusable snippets of code that help
setup and use Meiosis.

## Installation

Using `npm`:

```
npm i meiosis-routing
```

Using a `script` tag:

```
<script src="https://unpkg.com/meiosis-routing"></script>
```

FIXME
Using the `script` tag exposes a `Meiosis` global, under which `state.createRoutes`,
`state.*`, etc. are provided.

## State

The `state` section of `meiosis-routing` provides some functions to manage the routing state.

### `createRoutes`

The `createRoutes` function is a convenience for creating objects with the `{ id, params }`
structure. Instead of writing `{ id: "Profile", params: { user: "Duck", } }`, you can write
`Route.Profile({ user: "duck" })`.

To use it, call `createRoutes` with an array of strings for the routes of your application:

```javascript
const Route = createRoutes([
  "Home",
  "Login",
  "About",
  // ...
]);
```

----

_meiosis-routing is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._

