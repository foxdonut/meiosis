# Route

A _route_ is an object that represents a route in the state.

The shape of the route object (its properties) should be flexible.

At its core, the route object contains:

- a page ID
- path params if any
- query params if any

Example:

```javascript
{
  page: "Home",
  params: { ... },
  queryParams: { ... } // could also be contained within params
}
```

- Best practice:
  Using _selectors_ isolates the details of the route's properties in a single place.

# routeMatcher

`path => routeMatch`

Parses a path and converts it to a routeMatch object. The routeMatch object properties depend on the
third-party route matcher library.

Example:

```javascript
const routeMatcher = createRouteMatcher(routeConfig);
```

# matchToRoute

`(routeMatch, queryParams) => route`

Converts the third-party route matcher library's match object and the query params to a route.

# toUrl

`(page, params, queryParams) => url`

Converts unnamed arguments to a URL.

- Optionally supports query strings.

# toRoute

`(page, params, queryParams) => route`

Converts unnamed arguments to a route object.

# fromRoute

`route => ({ page, params, queryParams })`

Extracts page, params, and queryParams from the route object. This is only used inside the router
to extract information from the route object so that it can be passed to the `toUrl` function.

# window

- `decodeURI`
- `location`:
    - `pathname`
    - `hash` (hash mode)
    - `search` (history mode)
- `history`:
    - `pushState`
- `onpopstate`

# query string

Third party library to handle query strings, providing these two functions:

- `parse`
- `stringify`

# onRouteChange

The router's `start` function takes an `onRouteChange` callback function:

- `onRouteChange`: `route => void`

This function normally updates the application state.

# effect / locationBarSync

On each state update, keep the browser's location bar synchronized with the state route.

- uses `fromRoute` and `toUrl`.
