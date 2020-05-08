# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Using a Router - Basic Pattern Setup

This section discusses the basic pattern for setting up a router with Meiosis.

### Route State

To use a router with Meiosis, we'll store the current route in the application state under the
`route` property:

```javascript
// application state
{
  route: { page: "Home", params: {} },
  // rest of state
}
```

Then, we'll have access to the route via `state.route`. Using this information, a single top-level
view renders the page that corresponds to the route, using a simple key-value lookup:

```javascript
// The Home component
import { Home } from "../home";

// The Login component
import { Login } from "../login";

const componentMap = {
  Home: Home,  // render the Home component when the route page is "Home"
  Login: Login // render the Login component when the route page is "Login"
}

// in the view's render function
const Component = componentMap[state.route.page];
// render the Component
```

The essential idea is to store the route in the state. Then, we can write our application using the
state just like we have been doing all along.

### Getting the Current Path

### Matching a Path to a Route

### Navigating to a Route

### Keeping the Location Bar Synchronized

### The `createRouter` function

Putting everything together, here is our `createRouter` function:

```javascript
const createRouter = routeConfig => {
  const prefix = "#";

  const getPath = () => decodeURI(window.location.hash || prefix + "/")
    .substring(prefix.length);

  const routeMatcher = createRouteMatcher(routeConfig);

  const initialRoute = routeMatcher(getPath());

  const start = ({ navigateTo }) => {
    window.onpopstate = () => navigateTo(routeMatcher(getPath()));
  };

  const locationBarSync = route => {
    const path = route.url;

    if (getPath() !== path) {
      window.history.pushState({}, "", prefix + path);
    }
  };

  return { initialRoute, routeMatcher, start, locationBarSync };
};
```

You can see the complete code for the example
[here](https://github.com/foxdonut/meiosis/tree/master/docs/code/routing-full/pattern-setup).

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
