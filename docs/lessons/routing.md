# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Routing

The [meiosis-routing](https://github.com/foxdonut/meiosis/tree/master/helpers/routing) package
provides helper functions to manage routing in your state management code and to plug in a
router to handle parsing URL paths.

The goals of Meiosis Routing are:

- Simple route configuration
- No hardcoded paths in links
- Parent and child routes, and reusable child routes
- Relative navigation: navigate to a parent, sibling, or child route
- Redirect to a route after an action
- Authenticate / authorize before going to a route
- Load data (synchronously or asynchronously) when arriving at a route
- Clean up state when leaving a route
- Trigger arriving and leaving a route based on route and query parameters
- Prevent leaving a route to e.g. warn user of unsaved data

Let's learn Meiosis Routing step by step.

### Routing Example

@flems code/routing/components-01.js,code/routing/navigation-01.js,app.html,public/css/spectre.css [] 700 60 navigation-01.js

### Navigation

@flems code/routing/routes-02.js,code/routing/components-02.js,code/routing/navigation-02.js,app.html,public/css/spectre.css [] 700 60 navigation-02.js

### Route Segments

@flems code/routing/routes-03.js,code/routing/components-03.js,code/routing/navigation-03.js,app.html,public/css/spectre.css [] 700 60 navigation-03.js

### Transitions

### Services

### Adding A Router

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
