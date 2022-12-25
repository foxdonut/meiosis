# [meiosis-router](https://meiosis.js.org/router) Documentation

@docs-nav-start
@nav-empty
@nav-router-toc
@nav-next:router-basic.html:Basic Setup
@docs-nav-end

## Overview

`meiosis-router` sets up a router that uses Meiosis to produce route-related data to be stored in
the application state.

### Concepts

The Meiosis pattern updates application state which is then used render the view. `meiosis-router`
complements this concept by also using application state to drive routing.

`meiosis-router` coordinates between application state and routes:

- If the route is updated in the application state (in the same way as any other application state
  update with Meiosis), `meiosis-router` takes care of synchronizing the browser's location bar and history.
- If the browser's location bar changes, `meiosis-router` produces route data that can be stored in
  the application state.

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

@docs-nav-start
@nav-empty
@nav-router-toc
@nav-next:router-basic.html:Basic Setup
@docs-nav-end
