# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Routing

In this part of the Meiosis tutorial, we will look at routing. We'll use the simple page
navigation example shown below.

![Routing](routing-example.gif)

### Start Without Routing

Routing does not have to be so notoriously difficult and complicated. We'll start implementing
the application without routing, using the model as our single source of truth (as always) and
actions to navigate to different pages. Then, we can add routes as simple mappings to actions.

### Defining Navigation

To identify the different pages of the application, we'll use simple constants:

```javascript
export const pages = {
  home: { id: "Home", tab: "Home" },
  coffee: { id: "Coffee", tab: "Coffee" },
  beer: { id: "Beer", tab: "Beer" },
  beerDetails: { id: "BeerDetails", tab: "Beer" }
};
```

Then, to navigate, we can create a navigation object with convenient functions to navigate
to different pages. We'll assign the current page and parameters to the model. Thus the
model identifies the current location.

```javascript
export const createNavigation = update => {
  const navigate = (page, params = {}) =>
    update(model => Object.assign(model, ({ page, params })));

  const navigateToBeer = () => {
    services.loadBeer().then(beerList => {
      update(model => Object.assign(model, { beerList }));
      navigate(pages.beer);
    });
  };
  return { navigateToHome, navigateToBeer, ... };
};
```

Notice that we can also define what needs to happen when navigating to a page, such as
loading data from the server. Callers of these functions don't need to know what must
happen when navigating to a page.

### Creating the App

When creating the app, we'll pass the navigation object over so that we can call its
functions and navigate. Since the model identifies the current page, we'll create a
lookup map to conveniently find the corresponding component. Then we can just call
its `view` function to render the current page.

```javascript
export const createApp = (update, navigation) => {
  const homeComponent = createHome(update); //more...
  const pageMap = {
    [pages.home.id]: homeComponent, //more...
  };
  return {
    view: model => {
      const component = pageMap[model.page.id];
      return (
        // render tabs, model.page.tab determines active tab
        {component.view(model)}
      );
    }
  };
};
```

### Adding Routes

Adding routes is a simple mapping between route and a plain object with the page id and the
navigation action:

```javascript
export const createRouter = navigation => {
  const routes = {
    "/": { id: pages.home.id,
      action: navigation.navigateToHome },
    "/coffee/:id?": { id: pages.coffee.id,
      action: navigation.navigateToCoffee },
    "/beer": { id: pages.beer.id,
      action: navigation.navigateToBeer },
    "/beer/:id": { id: pages.beerDetails.id,
      action: navigation.navigateToBeerDetails }
  };
```

We can use a simple routing library such as [url-mapper](https://github.com/cerebral/url-mapper)
to resolve routes:

```javascript
import Mapper from "url-mapper";

const resolveRoute = () => {
  const route = document.location.hash.substring(1);
  const resolved = urlMapper.map(route, routes);
  if (resolved) {
    resolved.match.action(resolved.values);
  }
};

window.onpopstate = resolveRoute;
```

Once a route is resolved, we can call its `action` function to navigate to the page.

### Route Sync

Everything works now, except for one detail: although navigating with actions or routes
works the same way, navigating with an action does not reflect the corresponding route in
the browser's location bar.

We can fix this with a simple route sync function:

```javascript
const routeMap = Object.keys(routes).reduce((result, route) => {
  result[routes[route].id] = route;
  return result;
}, {});

const routeSync = model => {
  const segment = routeMap[model.page.id] || "/";
  const route = urlMapper.stringify(segment, model.params||{});
  if (document.location.hash.substring(1) !== route) {
    window.history.pushState({}, "", "#" + route);
  }
};
```

After building a page id to route lookup map, we can use it along with url-mapper's
`stringify` function to generate the route from the model's current page id.
Then, if the browser's location bar does not match the route, we can set it with
`window.history.pushState`.

Now, we can use actions and routes to navigate, and the browser's location bar
reflects the correct route. The model is our source of truth: in fact, we can even change
the model by typing in the textarea of the Meiosis Tracer, and see the correct route in
the browser's location bar along with the correct page in the view.

### Up Next

In the next section, we'll try a different routing library,
[Universal Router](04-Routing-B-Universal-Router.html).

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
