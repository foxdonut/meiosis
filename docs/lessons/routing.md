# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Routing

The [meiosis-routing](https://github.com/foxdonut/meiosis/tree/master/helpers/routing) package
provides helper functions to manage routing in your state management code and to plug in a router to
handle parsing URL paths.

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

<a name="section_contents"></a>
## Section Contents

- [Routing Example](#routing_example)
- [Navigation](#navigation)
- [Route Segments](#route_segments)
- [Transitions](#transitions)
- [Guarding Routes](#guarding_routes)
- [Adding a Router](#adding_a_router)
- [Mithril Router](#mithril_router)

<a name="routing_example"></a>
### Routing Example

To learn about routing, we'll use the example below. We have a simple app with different pages.
Clicking on the links at the top of the page will navigate to the corresponding page. Right now, we
have our components ready to go but the links don't work yet. Have a look to get familiar with the
example.

@flems code/routing/01-components.js,code/routing/01-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 01-app.js

[Section Contents](#section_contents)

<a name="navigation"></a>
### Navigation

Let's make the links navigate to the corresponding page. To represent which page we're on, we'll use
a plain object with an `id` property and a `params` property for any parameters we'd like to make
available to the page:

```javascript
{ id: "Home", params: {} }
{ id: "Login", params: {} }
// and so on
```

We'll put this in the application state under `route.current`:

```javascript
{ route:
  { current: { id: "Home", params:{} } }
}
```

@flems code/routing/02-routes.js,code/routing/02-components.js,code/routing/02-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 02-app.js

[Section Contents](#section_contents)

<a name="route_segments"></a>
### Route Segments

@flems code/routing/03-routes.js,code/routing/03-components.js,code/routing/03-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 03-app.js

[Section Contents](#section_contents)

<a name="transitions"></a>
### Transitions

@flems code/routing/04-routes.js,code/routing/04-components.js,code/routing/04-acceptors.js,code/routing/04-services.js,code/routing/04-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 04-app.js

[Section Contents](#section_contents)

<a name="guarding_routes"></a>
### Guarding Routes

@flems code/routing/05-routes.js,code/routing/05-components.js,code/routing/05-acceptors.js,code/routing/05-services.js,code/routing/05-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 05-app.js

[Section Contents](#section_contents)

<a name="adding_a_router"></a>
### Adding a Router

@flems code/routing/06-routes.js,code/routing/06-components.js,code/routing/06-acceptors.js,code/routing/06-services.js,code/routing/06-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 06-app.js

[Section Contents](#section_contents)

<a name="mithril_router"></a>
### Mithril Router

Mithril is a framework with what I call a "sweet spot" because it includes just enough of what we
need to develop web applications:

- hyperscript or JSX virtual DOM
- streams
- AJAX request handling
- router
- query string handling

@flems code/routing/07-routes.js,code/routing/07-components.js,code/routing/07-acceptors.js,code/routing/07-services.js,code/routing/07-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 07-app.js

[Section Contents](#section_contents)

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
