# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-empty
@nav-router-toc
@nav-next:router-setup.html:Setup / Hash Mode
@docs-nav-end

## Overview

`meiosis-router` sets up a router that uses Meiosis to produce route-related data to be stored in
the application state.

### Concepts

The Meiosis pattern updates application state which is then used render the view. `meiosis-router`
complements this concept by also using application state to drive routing.

`meiosis-router` provides:

- The initial route of the application
- A function to produce a route, which can be set in the application state, thus changing the
  application route programmatically
- A function to produce a URL in a type-safe manner. No need to construct URLs manually with string
  concatenation!

`meiosis-router` coordinates between application state and routes:

- When the browser's location bar changes, it produces route data to be stored in the application
  state
- It provides a function to synchronize the browser's location bar and history when the route is
  updated in the application state (in the same way as any other application state update with
  Meiosis). Thus, updating the route programatically works correctly with the browser's "Back"
  button.

`meiosis-router` can be set up to work one of two modes:

Hash Mode:

- Uses the browser's location hash for the route
- The hash-bang, `#!`, is used as a route prefix
- A location in the browser bar looks like `http://mysite.com/#!/user/42`
- You do not need any server-side routing support when using this mode
- This is the default mode.

History Mode:

- Uses routes directly in the URL
- A location in the browser bar looks like `http://mysite.com/user/42`
- When using this mode, you must provide server-side support to respond to route requests.

When setting up `meiosis-router`, we provide a mapping that associates route paths to strings that
identify the route.

Route paths are strings that start with a slash, such as `'/'`, `'/login'`, `/user/settings`, and so
on. Route paths can contain one or more _route parameters_, indicated with a `:` prefix, such as
`/user/:id`.

`meiosis-router` also supports _query parameters_, which are additional parameters provided at the
end of the URL in the form of `?key1=value1&key2=value2`.

### Route

`meiosis-router` produces `Route` objects of the following shape:

```js
{
  value: string,
  params: Object,
  replace: boolean
}
```

- `value` identifies the route
- `params` contains the combination of route parameters and query parameters
- `replace` indicates whether to replace the route in the browser's history instead of adding to it.

Using this information, we can perform tasks upon route change, such as loading data, and we can
render application views according to the current route.

@docs-nav-start
@nav-empty
@nav-router-toc
@nav-next:router-setup.html:Setup / Hash Mode
@docs-nav-end
