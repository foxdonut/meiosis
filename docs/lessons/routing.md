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

@flems code/routing/components-01.js,code/routing/app-01.js,routing.html,public/css/spectre.css [] 700 60 app-01.js

### Navigation

@flems code/routing/routes-02.js,code/routing/components-02.js,code/routing/app-02.js,routing.html,public/css/spectre.css [] 700 60 app-02.js

### Route Segments

@flems code/routing/routes-03.js,code/routing/components-03.js,code/routing/app-03.js,routing.html,public/css/spectre.css [] 700 60 app-03.js

### Transitions

@flems code/routing/routes-04.js,code/routing/components-04.js,code/routing/acceptors-04.js,code/routing/services-04.js,code/routing/app-04.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 app-04.js

### Guarding Routes

@flems code/routing/routes-05.js,code/routing/components-05.js,code/routing/acceptors-05.js,code/routing/services-05.js,code/routing/app-05.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 app-05.js

### Adding A Router

@flems code/routing/routes-06.js,code/routing/components-06.js,code/routing/acceptors-06.js,code/routing/services-06.js,code/routing/app-06.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 app-06.js

### Mithril Router

Mithril is a framework with what I call a "sweet spot" because it includes just enough of what
we need to develop web applications:

- hyperscript or JSX virtual DOM
- streams
- AJAX request handling
- router
- query string handling

@flems code/routing/routes-07.js,code/routing/components-07.js,code/routing/acceptors-07.js,code/routing/services-07.js,code/routing/app-07.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 app-07.js

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
