# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html) | [Documentation Examples](http://meiosis.js.org/docs-examples.html)

## Routing

The [meiosis-routing](https://github.com/foxdonut/meiosis/tree/master/helpers/routing#meiosis-routing) package
provides helper functions to manage routing in your state management code and to plug in a router to
handle parsing URL paths.

The goals of Meiosis Routing are:

- Simple route configuration
- No hardcoded paths in links
- Parent and child routes, and reusable child routes
- Relative navigation: navigate to a parent, sibling, same, or child route
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
- [Route Segments and Navigation](#navigation)
- [Using `Routing`](#routing)
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

> Note that we're using
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup) to wire up the
Meiosis pattern.

@flems code/routing/01-components.js,code/routing/01-app.js,routing.html,public/css/spectre.css,public/css/style.css preact,preactHooks,meiosis-setup 700 60 01-app.js

[Section Contents](#section_contents)

<a name="navigation"></a>
### Route Segments and Navigation

Let's make the links navigate to the corresponding page. To represent which page we're on, we'll use
a plain object with an `id` property and a `params` property for any parameters we'd like to make
available to the page:

```javascript
{ id: "Home", params: {} }
{ id: "Login", params: {} }
// and so on
```

This is called a _route segment_. To indicate the current route, we'll put it in the application
state under `route`:

```javascript
{ route:
  { id: "Home", params: {} }
}
```

Not to have to repeat this everywhere, we'll create a `navTo` function that places a route under
`route`, and a `navigateTo` action that uses it:

```javascript
// For convenience, route can be an array or a single route segment.
const navTo = route => ({ route: () => Array.isArray(route) ? route : [route] });

const app = {
  Actions: ({ update }) => ({
    navigateTo: route => update(navTo(route))
  })
};
```

#### Creating Route Segments

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
  initial: navTo(Route.Home()),
  Actions: ({ update }) => ({
    navigateTo: route => update(navTo(route))
  })
};
```

#### Mapping Route Segments to Components

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

It's now simple in the root view to look up the component using the id of the route in the state,
and display it:

```javascript
const Root = ({ state, actions }) => {
  const Component = componentMap[state.route.id];

  return (
    // ...
    <Component state={state} actions={actions} />
  );
};
```

#### Navigating Between Pages

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

@flems code/routing/02-routes.js,code/routing/02-components.js,code/routing/02-app.js,routing.html,public/css/spectre.css,public/css/style.css preact,preactHooks,meiosis-setup,meiosis-routing 700 60 02-app.js

[Section Contents](#section_contents)

<a name="routing"></a>
### Using `Routing`

In the previous example, we had a single route segment identifying the page that we display. We can
improve this by having a route to be **an array of route segments** instead of a single segment.

Multiple route segments give us the ability to have "deep" routes, where you not only navigate to a
page but also navigate within that page. For example:

- On the Tea page, we have a list of items. We can click on an item to display details about that
  item, to the right of the list. Then we can hide the details with the _Close_ link.
- On the Coffee page, we also have a list of items. Clicking on an item displays details _instead_
  of the list. From there, we can click on _Back to list_, or we can go further by clicking on
  _Brewer_, which displays the brewer details to the right. As with the Tea page, the _Close_ link
  hides the details.
- The Beer page works the same way as the Coffee page, except that it is for a list of beers. Here
  we want _reusable_ components and routes that work with Coffees and Beers, which we'll call
  Beverages.

We'll start by adding the `TeaDetails`, `Beverages`, `Beverage`, and `Brewer` route segments, so
that we now have:

```javascript
export const Route = createRouteSegments([
  "Home",
  "Login",
  "Settings",
  "Tea",
  "TeaDetails",
  "Coffee",
  "Beer",
  "Beverages",
  "Beverage",
  "Brewer"
]);
```

#### A Route is an Array

As explained above, we're changing our route representation to be an array. So our initial route
becomes:

```javascript
const app = {
  initial: navTo(Route.Home()),
  // ...
};
```

We'll also change the actions that navigate, passing an array to `actions.navigateTo`:

```javascript
actions.navigateTo([Route.Home()])
actions.navigateTo([Route.Login()])
// and so on
```

Now, on the Coffee and the Beer pages, we'll have the list of beverages **or** the details of a
single beverage. These are represented by `Route.Beverages` and `Route.Beverage`, respectively.
When navigating to the page, we'll show the list of beverages, so the actions become:

```javascript
<a href="#"
  onClick={() => actions.navigateTo([ Route.Coffee(), Route.Beverages() ])}
>
  Coffee
</a>

<a href="#"
  onClick={() => actions.navigateTo([ Route.Beer(), Route.Beverages() ])}
>
  Beer
</a>
```

#### Using `meiosis-routing`'s `Routing`

So now the route is an array of route segments. When we are at the top-level view, the first
segment determines which component to display. Then, within that component, the next segment
determines which component to display, and so on. We need a way to keep track of "where we
are at" in the array of route segments.

Moreover, the route array opens up the possibility to navigate to:

- a parent route
- a sibling route
- a child route
- the same route with different parameters

without having to mess with paths.

To make all of that simple, `meiosis-routing` provides helper functions. First, you construct a
_routing_ object with `Routing`, passing in the route from the state:

```javascript
import { Routing } from "meiosis-routing/state";

const Root = ({ state, actions }) => {
  const routing = Routing(state.route);
  // ...
};
```

Now we have a `routing` instance with these helper properties and methods:

- `routing.localSegment` - returns the route segment for the local route.
- `routing.childSegment` - returns the route segment for the child route.
- `routing.next()` - creates a `routing` instance, changing to the next route in the array.
- `routing.parentRoute()` - returns the route array for the parent route.
- `routing.siblingRoute(route)` - returns the route array for a route with the last child
replaced with the passed in route, which can be a single segment or an array of segments.
- `routing.childRoute(route)` - same as `siblingRoute`, but without removing the last child.
- `routing.sameRoute(params)` - same route but with different parameters

In the Root component we use the `routing` instance to get the component for the local route
segment. We also pass `routing` down to the component:

```javascript
const Root = ({ state, actions }) => {
  const routing = Routing(state.route);
  const Component = componentMap[routing.localSegment.id];

  return (
    // ...
    <Component state={state} actions={actions} routing={routing} />
    // ...
  );
};
```

Each component can use `routing` to get information about its route segment and the route segment of
its child, as well as to get a parent, sibling, same, or child route.

On the Tea page, we display the list of teas. If the user clicks on an item in the list, we also
display the description of that item. Thus the `routing` for the Tea page either has a
`childSegment`, or it does not. We can use this to decide whether to display the `TeaDetails`
component:

```javascript
{routing.childSegment.id === "TeaDetails" && (
  <TeaDetails state={state} actions={actions} routing={routing.next()} />
)}
```

Notice that we pass `routing.next()` down to the child component, so that we move the routing to the
next segment in the array. The child component can then use `routing` to get the local segment,
child segment, parent route, etc. and get the correct values relative to its segment.

In the `Tea` component, we use `routing.childRoute` to navigate down to the Tea Details:

```javascript
<a
  href="#"
  onClick={() =>
    actions.navigateTo(
      routing.childRoute(Route.TeaDetails({ id: 1 }))
    )
  }
>
  Tea 1
</a>
```

Notice how we can pass the `id` in the `TeaDetails` route segment to indicate the id of the selected
tea.

Then in the `TeaDetails` component, we can use `routing.parentRoute` to navigate back up:

```javascript
<a
  href="#"
  onClick={() =>
    actions.navigateTo(routing.parentRoute())
  }
>
  Close
</a>
```

The Coffee and Beer pages display either the list of beverages (`Beverages`), or the details of the
beverage that the user clicked on (`Beverage`), so we can use a simple lookup to determine which
component to display:

```javascript
const componentMap = {
  Beverages,
  Beverage
};

export const Coffee = ({ state, actions, routing }) => {
  const Component = componentMap[routing.childSegment.id];

  return (
    <div>
      <div>Coffee Page</div>
      <Component state={state} actions={actions} routing={routing.next()} />
    </div>
  );
};
```

In the `Beverages` component, when clicking on an item, we want to display the details of that item
_instead_ of the list of beverages. We can use `routing.siblingRoute`:

```javascript
<a
  href="#"
  onClick={() =>
    actions.navigateTo(
      routing.siblingRoute(Route.Beverage({ id: 1 }))
    )
  }
>
  Beverage 1
</a>
```

Similarly in the `Beverage` component we also use `routing.siblingRoute` to navigate back to the
list of beverages:

```javascript
<a
  href="#"
  onClick={() =>
    actions.navigateTo(routing.siblingRoute(Route.Beverages()))
  }
>
  Back to list
</a>
```

To navigate further down to the details of the brewer, we use `routing.childRoute`:

```javascript
<a
  href="#"
  onClick={() =>
    actions.navigateTo(routing.childRoute(Route.Brewer()))
  }
>
  Brewer
</a>
```

And in the `Brewer` component, we can close the brewer details with `routing.parentRoute`:

```javascript
<a
  href="#"
  onClick={() =>
    actions.navigateTo(routing.parentRoute())
  }
>
  Close
</a>
```

#### Advantages of `Routing`

As you can see, `routing` makes navigation simple. We can use `parentRoute`, `siblingRoute`, and
`childRoute` to navigate relatively to the component. This works independently of how many children
there are in the route: the _Back to list_ link in the `Beverage` works the same way whether or not
there is a `Brewer` child route.

Finally, this routing strategy allows us to _reuse_ a series of routes: both the Coffee and Beer
pages reuse the same `Beverages`, `Beverage`, and `Brewer` components and route segments.

Try the full example below, navigate within the Tea, Coffee, and Beer pages, and observe the state
in the console log. Browse the code to see how the pieces fit together.

@flems code/routing/03-routes.js,code/routing/03-components.js,code/routing/03-app.js,routing.html,public/css/spectre.css,public/css/style.css preact,preactHooks,meiosis-setup,meiosis-routing 700 60 03-app.js

[Section Contents](#section_contents)

<a name="transitions"></a>
### Transitions

We now have some pretty good navigation going on. Next, we want to handle route _transitions_: run
some code when _arriving_ at a route, such as load some data for the page, and when _leaving_ a
route, to unload data and clean up the state for example.

#### Transition State

The first thing we'll do is indicate, in the application state, which route we are leaving and at
which route we are arriving when navigating. When the state changes but no navigation occurs, both
will be empty.

The `routeTransition` function from `meiosis-routing` takes the previous route and the next route,
and returns an object with `leave`, and `arrive` properties. Both contain lookups, keyed by route
id, that indicate which routes we are leaving and to which we are arriving.

In order to have the previous route and the next route, we'll use `nextRoute` in the state to
indicate to which route we are navigating.

To use `routeTransition`, we need to wire it up as a service function. Refer to
[Services and Effects](http://meiosis.js.org/docs/services-and-effects.html) for a refresher.

Because we need both the current route and the next route in order to calculate a route transition,
we'll change `navTo` to set `nextRoute` in the state, so that we have both `route` and `nextRoute`.
Then, we can pass those values when we call the `routeTransition` function. That will calculate the
route transition. That being done, we can copy `nextRoute` to `route`.

Here is how to write a service function for `routeTransition` and wire it up:

```javascript
import { routeTransition } from "meiosis-routing/state";

const navTo = route => ({ nextRoute: () => Array.isArray(route) ? route : [route] });

export const routeService = state => ({
  routeTransition: () => routeTransition(state.route, state.nextRoute),
  route: state.nextRoute
});

// ...

const app = {
  // ...
  services: [routeService],
  // ...
};
```

Now, when we navigate from one page to another, such as from `Home` to `Tea`, we'll have this in
the application state:

```javascript
{
  route: [{ id: "Tea", params:{} }],
  routeTransition: {
    leave: {
      Home: { id: "Home", params: {} }
    },
    arrive: {
      Tea: { id: "Tea", params: {} }
    }
  }
}
```

We can use `state.routeTransition.leave` to unload data, clean up the application state and so on,
and `state.routeTransition.arrive` to load data for a page, prepare the state, etc. For these tasks
we can use _services_.

#### Using the Transition State in Services

We've seen how [Services](http://meiosis.js.org/docs/services-and-effects.html)
are functions that run on state changes. Since we're using `meiosis-setup`, we just have to specify
a `services` array in our `app` object with the service functions that we want to execute.

Let's pretend we are loading the list of teas asynchronously. To keep the example simple, we'll just
use hardcoded data:

```javascript
const teas = [
  {
    id: "t1",
    title: "Tea 1",
    description: "Desc. of Tea 1"
  },
  {
    id: "t2",
    title: "Tea 2",
    description: "Desc. of Tea 2"
  }
];
```

We want to "load" the list when we arrive at the Tea page, and clean up the application state when
we leave. We know we've arrived or left depending on the presence of the `Tea` id in the `arrive` or
`leave` object. The params don't matter, but they _will_ be returned in the matched route segment so
that we can use them as necessary.

Here is the `teaService`:

```javascript
export const teaService = state => {
  if (state.routeTransition.leave.Tea) {
    return { teas: null };
  }
};
```

And here is the `teaEffect`:

```javascript
export const teaEffect = update => state => {
  if (state.routeTransition.arrive.Tea) {
    setTimeout(() => {
      update({ teas });
    }, 500)
  }
};
```

If we find the `Tea` id in `arrive`, we simulate loading data asynchronously with `setTimeout` and
set the `teas` in the application state. If we find `Tea` in `leave`, then we clean up the
application state by setting `teas` to `null`.

We wire up the service in the `services` array of our `app` object, taking care of putting it
**after** `routeService`. We also set up `teaEffect` by putting it in the `effects` array:

```javascript
const app = {
  // ...
  services: [routeService, teaService],
  Effects: update => [teaEffect(update)]
  // ...
};
```

It's important to put `teaService` after `routeService` because `teaService` uses the
`routeTransition` data produced by `routeService`.

Now when we arrive at the `Tea` page, the `teas` will not yet be loaded into the application state
since we simulated a 500 ms delay. We can display a "Loading..." message until the `teas` are
available:

```javascript
{state.teas ? (
  state.teas.map(tea => (
    <div key={tea.id}>
      {/* ... */}
    </div>
  ))
) : (
  <div>Loading...</div>
)}
```

This will display "Loading..." and then the list of teas when they have been loaded.

#### State Transition with `params`

Above, we didn't have any `params` in the `Tea` route segment. We either arrive or leave the page.
However we can also have route transitions with `params` and _both_ arrive _and_ leave the same
route segment, each with different `params`.

Consider displaying the details for a tea when the user clicks on a link. Again we want to load the
details when they arrive, and reset when they leave. The list of teas remains visible on the left,
and the details are displayed on the right.

Now think about what happens when the user clicks on the "Tea 1" link, followed by a click on the
"Tea 2" link. In that case, we are _leaving_ the `TeaDetails` route segment with
`{ params: { id: "t1" } }`, _and_ at the same time we are _arriving_ at `TeaDetails` with
`{ params: { id: "t2" } }`.

While in `teaService` we had an `if ... else`, for the `teaDetailService` we need to check `leave`
even if a match was found in `arrive`, because both could match at the same time. We can use the
matched route segment's `params` to determine the `id` of the tea to load and/or unload:

```javascript
// teaMap is a simple id->tea lookup object.

export const teaDetailService = state => {
  const patches = [];

  if (state.routeTransition.arrive.TeaDetails) {
    const id =
      state.routeTransition.arrive.TeaDetails.params.id;
    const description = teaMap[id].description;
    patches.push({ tea: { [id]: description } });
  }

  if (state.routeTransition.leave.TeaDetails) {
    const id =
      state.routeTransition.leave.TeaDetails.params.id;
    patches.push({ tea: { [id]: undefined } });
  }

  return patches;
};
```

Now we can click on Tea 1 and then on Tea 2, and only the selected tea will be loaded into the
application state; we won't be accumulating state as we click on different links.

The Coffee and Beer pages work in the same way. Services load and unload data for the list of items,
the details of an item, and the details of an item's brewer.

#### Benefits of Route Transitions

As you have seen, using route transitions allows us fine control over leaving and arriving. Because
our routes are arrays of route segments, we can pinpoint specific details about the route
transitions that occur:

- When we arrive at the Tea, Coffee, or Beer page, we load the data for the page.
- When we navigate _within_ one of those pages, we _only_ load the data for the details of the item
to which we are navigating. Notice that the top-level list is _not_ loaded again as we navigate
within the page.
- We can load and unload data for route segments with specific `params`. With route transitions it's
possible to leave _and_ arrive route segments with the same id but different params.

Below is the complete example.

@flems code/routing/04-routes.js,code/routing/04-components.js,code/routing/04-services.js,code/routing/04-app.js,routing.html,public/css/spectre.css,public/css/style.css preact,preactHooks,meiosis-setup,meiosis-routing 700 60 04-app.js

[Section Contents](#section_contents)

<a name="guarding_routes"></a>
### Guarding Routes

Sometimes you want to prevent users from accessing certain pages if they are not logged in. You
would normally hide the link from the page, but that does not prevent them from manually typing in a
link.

#### Preventing Access to a Page

For demonstration purposes, the _Settings_ link always appears in our example, but let's pretend
that users must be logged in to access that page. When the user clicks on the link, we want to
redirect them to the Login page and display the message: "Please login."

We can write a service function for the Settings page which checks whether the user is logged in,
and _changes_ the route to the Login page if they are not. As a bonus, we want to automatically send
the user back to the Settings page after they log in, since that is where they were trying to go.

```javascript
import { Route } from "./05-routes";

export const settingsService = state => {
  if (
    state.routeTransition.arrive.Settings &&
    !state.user
  ) {
    const route = [
      Route.Login({
        message: "Please login.",
        returnTo: Route.Settings()
      })
    ];
    return {
      nextRoute: route,
      route,
      routeTransition: {
        arrive: () => ({ Login: Route.Login() }),
        leave: () => ({})
      }
    };
  }
};
```

Services run in order, so it makes sense to place the `settingsService` near the top of the list,
while still making sure that `routeService` is first:

```javascript
const app = {
  // ...
  services: [routeService, settingsService, ...],
  // ...
};
```

If we have other services between `routeService` and `settingsService`, things will still work
correctly, but the work done by those other services would get thrown out when the `settingsService`
does a redirect.

Now, if we navigate to Settings without logging in, we'll be redirected to the Login. We can display
the message by retrieving it from the route params. We can also get the `returnTo` value so that we
can automatically send the user back to the Settings page after they log in.

```javascript
export const Login = ({ state, actions, routing }) => {
  const { message, returnTo } = routing.localSegment.params;

  return (
    <div>
      {message ? <div>{message}</div> : null}
      <div>Login</div>
      <form className="form">
        {/* ... */}
        <button
          className="btn btn-primary"
          onClick={() => actions.login(state.login.username, returnTo)}>
          Login
        </button>
      </form>
    </div>
  );
};
```

The `login` action sets the `user` in the state and sends the user to the `returnTo` page if there
is one, otherwise to the `Home` page:

```javascript
login: (username, returnTo) =>
  update([
    { user: username },
    navTo(returnTo || Route.Home())
  ])
```

The Settings page now requires the user to log in before accessing the page.

#### Warning Before Leaving a Page

We can also guard against leaving a page, say to warn user that they will lose changes they've made
on the page if they proceed. Let's try that with the Login page. If the user has entered anything in
the `username` or `password` field and then navigate away from the page, we'll warn them and give
them a chance to cancel the navigation and stay on the Login page.

To achieve this, we'll write another service function. When the user arrives at the Login page,
we'll prepare the `login` state with a blank username and password. If the user is navigating away
from the Login page, and they in the process of logging in, the state contains something in
`username` and/or `password`. We'll use `confirm` to ask the user if they want to continue:

```javascript
export const loginService = state => {
  if (state.routeTransition.arrive.Login) {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  } else if (state.routeTransition.leave.Login) {
    if (
      !state.user &&
      (state.login.username || state.login.password) &&
      !confirm("You have unsaved data. Continue?")
    ) {
      const route = [Route.Login()];
      return {
        route,
        nextRoute: route,
        routeTransition: {
          leave: () => ({}),
          arrive: () => ({})
        }
      };
    }
    return { login: null };
  }
};
```

If they decide to cancel, we revert to the previous state, so we stay on the Login page. The rest of
the state is not changed, so `returnTo`, if present, will continue to work after they log in.

Finally we just need to add `loginService` to the list of `services`:

```javascript
const app = {
  // ...
  services: [routeService, settingsService, loginService, ...],
  // ...
};
```

You can try out the complete example below.

@flems code/routing/05-routes.js,code/routing/05-components.js,code/routing/05-services.js,code/routing/05-app.js,routing.html,public/css/spectre.css,public/css/style.css preact,preactHooks,meiosis-setup,meiosis-routing 700 60 05-app.js

#### Advantages of State-Managed Routing

Up until now, everything we've done with routing and navigation has been managed by functions that
work with the application state. This is a good thing! We do not depend on a particular router
library and its features to be able to programmatically navigate between pages, handle route
transitions, have reusable child routes, prevent access, and so on.

This gives us the advantage of needing only a simple router library to manage URL paths. We will add
a router in the next section.

[Section Contents](#section_contents)

<a name="adding_a_router"></a>
### Adding a Router

Everything works in our routing example. The only thing we don't have is a set of route _paths_ that
match our routes. Having paths means:

- we can put them in our links as `href`
- users can bookmark links, open them in new tabs, and so on
- users can use the browser's _back_ and _forward_ buttons to navigate
- users can go _directly_ to a page by pasting a link.

We'd like to add paths _without_ hardcoding them everywhere in our application. We want to
_continue_ using our programmatic routes such as `[Route.Beer(), Route.Beverages()]` and
`routing.parentRoute()`. Finally, we also want to set the route in an action, acceptor, or service,
and have the corresponding path show up in the browser's location bar.

We can achieve all of this with `meiosis-routing` and a simple router library of your choice.

#### Route Configuration

First thing we'll do is write a _route configuration_. This is a plain object that associates paths
to route segment ids:

```javascript
export const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  // ...
};
```

This associates `/` to `[Route.Home()]`, `/login` to `[Route.Login()]`, and so on.

What about route parameters? It's very common practice to use `:` to indicate parameters in paths,
such as `/tea/:id`, so that's what `meiosis-routing` uses.

The other part of the story is that routes are arrays that can have multiple segments. You've seen
how this gives us reusable subroutes and parent/sibling/child routes.

We can configure paths with multiple route segments by using an array. The first element in the
array is the path, and the second is a nested route configuration object:

```javascript
export const routeConfig = {
  // ...
  Tea: ["/tea", { TeaDetails: "/:id" }],
  // ...
};
```

This associates:

- `/tea` to `[Route.Tea()]`
- `/tea/:id` to `[Route.Tea(), Route.TeaDetails({ id })]`.

We can configure nested routes like this for as many segments as we need. We can also reuse a nested
route configuration. For the Coffee and Beer pages, we want the same nested routes for `[Beverages]`
and `[Beverage, Brewer]`. We can create a route configuration and reuse it:

```javascript
const beverageRoutes = {
  Beverages: "",
  Beverage: ["/:id", { Brewer: "/brewer" }]
};

export const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: ["/tea", { TeaDetails: "/:id" }],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer", beverageRoutes]
};
```

Notice how we can reuse `beverageRoutes` under `Coffee` and `Beer`.

There is one last bit of configuration that we can do in a route config. When we used the `Brewer`
route segment, we passed the `id` that came from the parent `Beverage` route segment:

```javascript
const Beverage = ({ state, actions, routing }) => {
  const id = routing.localSegment.params.id;

  return (
    // ...
    <a
      href="#"
      onClick={() => actions.navigateTo(
        routing.childRoute(Route.Brewer({ id }))
      )}
    >
      Brewer
    </a>
  );
};
```

But, in the route configuration that we have above, the `id` will _not_ be passed down to `Brewer`
because the `:id` parameter is for the `Beverage` segment.

To fix this, we specify parameters that a route segment should receive from parent segments as an
array after the path, like this:

```javascript
Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
```

To summarize, in the route configuation, we have these options to associate to the id of a route
segment:

- Just the path: `Login: "/"`
- An array with the path and an array of parameters to receive from the parent:
`Brewer: ["/brewer", ["id"]]`
- An array with the path and a nested route configuration:
`Tea: ["/tea", { TeaDetails: "/:id" }]`
- An array with the path, an array of parameters to receive from the parent, and a nested route
configuration:
`Brewer: ["brewer", ["id"], { ... }]`

Here is our final route configuration:

```javascript
const beverageRoutes = {
  Beverages: "",
  Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
};

export const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: ["/tea", { TeaDetails: "/:id" }],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer", beverageRoutes]
};
```

This gives us the following path &rarr; route mappings:

- `/` &rarr; `[Route.Home()]`
- `/login` &rarr; `[Route.Login()]`
- `/settings` &rarr; `[Route.Settings()]`
- `/tea` &rarr; `[Route.Tea()]`
- `/tea/:id` &rarr; `[Route.Tea(), Route.TeaDetails({ id })]`
- `/coffee` &rarr; `[Route.Coffee(), Route.Beverages()]`
- `/coffee/:id` &rarr; `[Route.Coffee(), Route.Beverage({ id })]`
- `/coffee/:id/brewer` &rarr; `[Route.Coffee(), Route.Beverage({ id }), Brewer({ id })]`
- `/beer` &rarr; `[Route.Beer(), Route.Beverages()]`
- `/beer/:id` &rarr; `[Route.Beer(), Route.Beverage({ id })]`
- `/beer/:id/brewer` &rarr; `[Route.Beer(), Route.Beverage({ id }), Brewer({ id })]`

#### Using a Router Library

To parse paths and associate them to routes, we'll use a router library. You have seen that we've
already done all the work of routing, navigation, route transitions, guarding routes, etc. So all
we really need is a simple router library that will parse paths. There are many to choose from;
`meiosis-routing` comes with out-of-the-box support for these:

- [feather-route-matcher](https://github.com/HenrikJoreteg/feather-route-matcher)
- [url-mapper](https://github.com/cerebral/url-mapper)
- [Mithril Router](https://mithril.js.org/route.html) (discussed in the next section)

You can also plug in a different library. This is outside the scope of this tutorial, but you can
read the details
[here](https://github.com/foxdonut/meiosis/blob/master/helpers/routing/api.md#createrouter).

In this tutorial we'll use `feature-route-matcher`. To create a router, `meiosis-routing` provides
`createFeatureRouter` to which we pass the `createRouteMatcher` function from
`feather-route-matcher`, our `routeConfig`, and a `defaultRoute`:

```javascript
import createRouteMatcher from "feather-route-matcher";
import { createFeatherRouter } from "meiosis-routing/router-helper";

const beverageRoutes = {
  Beverages: "",
  Beverage: ["/:id", { Brewer: ["/brewer", ["id"]] }]
};

const routeConfig = {
  Home: "/",
  Login: "/login",
  Settings: "/settings",
  Tea: ["/tea", { TeaDetails: "/:id" }],
  Coffee: ["/coffee", beverageRoutes],
  Beer: ["/beer", beverageRoutes]
};

export const router = createFeatherRouter({
  createRouteMatcher,
  routeConfig,
  defaultRoute: [Route.NotFound()]
});
```

Notice that we have `Route.NotFound()` as the default route. Before we added paths, navigation was
completely "internal" to the application, managed by actions. Now that the user can enter a path,
it's possible that they enter something invalid. The default route is used when no match is found,
and we have a simple "Page Not Found" message for that case. We can add that by adding `"NotFound"`
to our route segments, creating a `NotFound` component, and adding it to our component map:

```javascript
export const Route = createRouteSegments([
  // ...,
  "NotFound"
]);

export const NotFound = () => <div>Page Not Found</div>;

const componentMap = {
  // ...,
  NotFound
};
```

So now we have a `router` with these properties and functions:

- `initialRoute`
- `start`
- `toPath`
- `locationBarSync`

Let's look at them in more detail.

#### Initial Route

As the name implies, `router.initialRoute` gives us the initial route so that we can put it in the
app's initial state. Before, we just initialized the route ourselves, but now that we are adding
support for paths, the initial route is what the user has entered in the browser's location bar.

We're not using it in this example because it is embedded inside the page. But normally we'd
simply replace:

```javascript
initial: navTo(Route.Home())
```

with:

```javascript
initial: navTo(router.initialRoute)
```

We do have a "Location" text field to simulate the location bar, but it is initially blank and we
just initialize the route to the Home page.

#### Starting the Router

Once we've created the router, we need to "start" it so that it triggers route changes when the path
in the location bar changes via a link, when the user enters a different path, presses the browser's
Back button, and so on. We need to pass a `navigateTo` property to the `start` function to tell the
router how to signal a route change. In our application, this is `actions.navigateTo`:

```javascript
router.start({ navigateTo: actions.navigateTo });
```

The router will call `actions.navigateTo` and pass the route whenever the route changes.

#### Using `toPath`

Now that we have a router, we can use paths in the `href` attributes of our links instead of `"#"`
with `onclick={...}`. Users will be able to bookmark links, open links in new tabs, and see the
path in the browser's location bar.

To avoid hardcoding paths, we can use `router.toPath`, passing the same array of route segments that
we pass to `actions.navigateTo`. We can change our links from:

```javascript
<a
  href="#"
  onClick={() => actions.navigateTo([Route.Settings()])}
>
  Settings
</a>

<a
  href="#"
  onClick={() => actions.navigateTo(routing.childRoute(Route.Brewer({ id })))}
>
  Brewer
</a>
```

to:

```javascript
<a href={router.toPath([Route.Settings()])}>Settings</a>

// We don't have to pass the id to Route.Brewer because we already have it
// configured to inherit from the parent route in our route configuration.
<a href={router.toPath(routing.childRoute(Route.Brewer()))}>
  Brewer
</a>
```

That's pretty nice, wouldn't you say?

#### Keeping the Location Bar in Sync

When the user clicks on a link with a path in `href`, or uses the browser's Back and Forward
buttons, the location bar changes _first_ and then the router triggers a route change. But when we
make a route change _programatically_ by calling `actions.navigateTo` or changing the route in the
state, the location bar won't automatically display the corresponding path.

We can use `route.locationBarSync`, calling it when the state changes and passing the route from the
state:

```javascript
states.map(state =>
  router.locationBarSync(state.route)
);
```
This will keep the location bar in sync.

#### Query String Parameters

Besides `:` in paths, another way to have parameters in routes is with the query string. This is
appended to the end of the path in the browser's location bar in the form of
`?parameter1=value1&parameter2=value2`. (The format may vary depending on the query string library
that you choose.)

With `meiosis-routing` you can assign parameters from the query string to route segments by using
`?` and/or `&` in the path. For example, on the Beer page, let's say we want to optionally have the
type and country of the beer. We write the path as:

```javascript
Beer: ["/beer?type&country", beverageRoutes]
```

Now, if present in the query string, the `type` and `country` parameters are available in the route
segment:

```javascript
export const Beer = ({ state, actions, routing }) => {
  const { type, country } = routing.localSegment.params;
  // ...
};
```

Just like path parameters, changes in query string parameters will trigger `leave` and `arrive`
changes for the route segment.

> Note: The `?param1&param2&param3` notation feels close to the format of the query string, but know
that you can use any combination of `?` and/or `&` on the path, as you prefer. So these paths all
work the same:
```javascript
Beer: ["/beer?type?country", beverageRoutes]
Beer: ["/beer&type&country", beverageRoutes]
Beer: ["/beer&type?country", beverageRoutes]
```

To parse and stringify the query string, we need to plug in a library. The only requirement for
`meiosis-routing` is that the library must have the `parse` and `stringify` functions; if they do
not, you can just wrap the library into an object with those functions, which in turn call the
library's equivalents.

Again, there are several options; examples of libraries that work well are:

- [query-string](https://github.com/sindresorhus/query-string)
- [qs](https://github.com/ljharb/qs)
- [urlon](https://github.com/cerebral/urlon)
- [Mithril](https://mithril.js.org/parseQueryString.html) (discussed in the next section)

To use a query string library, we specify it as `queryString` when we call `createFeatherRouter`:

```javascript
import createRouteMatcher from "feather-route-matcher";
import queryString from "query-string";

export const Route = createRouteSegments([...]);

const routeConfig = {...};

export const router = createFeatherRouter({
  createRouteMatcher,
  queryString,
  routeConfig,
  defaultRoute: [Route.NotFound()]
});
```

Because `queryString` has `parse` and `stringify`, we don't need to do anything else.

#### Complete Example

We've completed our routing example! You will find the full source below. Since the example is
embedded into the page, there is no browser location bar. You can use the "Location" text field to
simulate, by changing the path and pressing the Go button. Also notice that the location bar stays
in sync as you navigate.

@flems code/routing/06-routes.js,code/routing/06-components.js,code/routing/06-services.js,code/routing/06-app.js,routing.html,public/css/spectre.css,public/css/style.css preact,preactHooks,meiosis-setup,meiosis-routing 700 60 06-app.js

> Note: while the examples here are embedded into the page, "full" examples that you can run locally
are available [here](https://github.com/foxdonut/meiosis/tree/master/docs/code/routing-full). Follow
[these instructions](https://github.com/foxdonut/meiosis/tree/master/docs) to run all the examples.

[Section Contents](#section_contents)

<a name="mithril_router"></a>
### Mithril Router

[Mithril](https://mithril.js.org) is a framework with what I call a "sweet spot" because it includes
just enough of what we need to develop web applications:

- hyperscript or JSX virtual DOM
- streams
- AJAX request handling
- router
- query string handling

Because of this, `meiosis-routing` includes special support for
[Mithril Router](https://mithril.js.org/route.html) by providing `createMithrilRouter`.

To use it, we only need to provide Mithril's `m` and our `routeConfig`:

```javascript
export const router = createMithrilRouter({
  m,
  routeConfig
});
```

Because Mithril Router works a little differently, we need to add our `NotFound` route to the route
configuration instead of using `defaultRoute`. Mithril's notation for a "catch-all" route is
`":someName..."`, typically `":404..."`, so we add that at the end of our `routeConfig`:

```javascript
const routeConfig = {
  // ...,
  NotFound: "/:404..."
};
```

Finally, again because of differences in how Mithril Router works, we don't use `router.start`.
Instead, we let Mithril handle routing by calling `m.route`. The `router` that we created contains a
`MithrilRoutes` function that constructs a routing configuration that Mithril understands. To use
it, we need to pass our `states` stream, our `actions` object, and our top-level `App` component:

```javascript
m.route(
  document.getElementById("app"),
  "/",
  router.MithrilRoutes({ states, actions, App })
);
```

The complete example is shown below.

@flems code/routing/07-routes.js,code/routing/07-components.js,code/routing/07-services.js,code/routing/07-app.js,routing.html,public/css/spectre.css,public/css/style.css mithril,mithril-stream,meiosis-setup,meiosis-routing 700 60 07-app.js

[Section Contents](#section_contents)

[Table of Contents](toc.html) | [Documentation Examples](http://meiosis.js.org/docs-examples.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
