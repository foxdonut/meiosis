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
have our components ready to go but the links don't work yet. Have a look at the code to get
familiar with the example. Don't worry about the "Show state in console log" and the "Location",
they don't work yet and we'll use them later.

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

This is called a _route segment_. To indicate the current route, we'll put it in the application
state under `route.current`:

```javascript
{ route:
  { current: { id: "Home", params:{} } }
}
```

Not to have to repeat this everywhere, we'll create a `navTo` function that places a route under
`route.current`, and a `navigateTo` action that uses it:

```javascript
const navTo = route => ({
  route: { current: route }
});

const app = {
  Actions: ({ update }) => ({
    navigateTo: route => update(navTo(route))
  })
};
```

To conveniently create a route segment, we can use `meiosis-routing`'s `createRouteSegments`
function. We pass an array of strings with the ids of our route segments, and we get back an object
with properties that match the ids.

```javascript
export const Route = createRouteSegments([
  "Home",
  "Login",
  "Settings",
  "Tea",
  "Coffee",
  "Beer"
]);
```

Now, to create a route segment, we can use:

```javascript
Route.Home()
// returns { id: "Home", params: {} }
```

If we need any `params`, we can pass them in:

```javascript
Route.Tea({ id: "t1" })
// returns { id: "Tea", params: { id: "t1" } }
```

Let's initialize the state with the `Home` route:

```javascript
const app = {
  Initial: () => navTo(Route.Home()),
  Actions: ({ update }) => ({
    navigateTo: route => update(navTo(route))
  })
};
```

To display the component that corresponds to a route id, we have a simple component map that
associates the id to the component:

```javascript
import { Home, Login, Settings, Tea, Coffee, Beer } from "./02-components";

const componentMap = {
  Home,
  Login,
  Settings,
  Tea,
  Coffee,
  Beer
};
```

It's now simple in the root view to look up the component using the id of the current route in the
state, and display it:

```javascript
const Root = ({ state, actions }) => {
  const Component = componentMap[state.route.current.id];

  return (
    // ...
    <Component state={state} actions={actions} />
  );
};
```

To navigate between pages, we have the `navigateTo` action which we created earlier. So, navigating
to a page is just a matter of calling the action:

```javascript
<a href="#" onClick={() => actions.navigateTo(Route.Home())}>
  Home
</a>

<a href="#" onClick={() => actions.navigateTo(Route.Login())}>
  Login
</a>

// and so on
```

See the full example below. You can switch on "Show state in console log" to see the application
state change as you navigate the pages.

Notice that at this point, our routes are only a single level deep. Each route id maps to a
component which we display. In the next section, we'll look at how we can have multi-level routes.

@flems code/routing/02-routes.js,code/routing/02-components.js,code/routing/02-app.js,routing.html,public/css/spectre.css,public/css/style.css [] 700 60 02-app.js

[Section Contents](#section_contents)

<a name="route_segments"></a>
### Route Segments

In the previous example, we had a single route segment identifying the page that we display. We can
improve this by having a route to be **an array of route segments** instead of a single segment.

Multiple route segments give us the ability to have "deep" routes, where you not only navigate to a
page but also navigate within that page. For example:

- On the Tea page, we have a list of items. We can click on an item to display details about that
  item, below the list.
- On the Coffee page, we also have a list of items. Clicking on an item displays details _instead_
  of the list. From there, we can click on "Back to list", or we can go further down by clicking on
  "Brewer Details".
- The Beer page works the same way as the Coffee page, except that it is for a list of beers. Here
  we want _reusable_ components and routes that work with Coffees and Beers, which we'll call
  Beverages.

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
