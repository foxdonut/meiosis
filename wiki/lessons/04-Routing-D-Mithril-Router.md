# [Meiosis](http://meiosis.js.org) Wiki

[Table of Contents](toc.html)

## Routing - Using the Mithril Router

In the [previous section](04-Routing-A-Navigation-Without-Routes.html), we started implementing the
navigation example shown below. Now, let's add some routes.

![Routing](routing-example.gif)

### Running the Example

To run this example (and every example in the Wiki):

```
git clone https://github.com/foxdonut/meiosis
cd meiosis/wiki
npm i
npm start
```

Then open [http://localhost:9000](http://localhost:9000) to view the example index, and click on
the specific example.

The code for the examples is located in `meiosis/wiki/code`. You can edit code there and reload
the page in your browser to see your changes.

### Specifying Routes

To add routes, we'll specify a `route` property when registering our components with the navigator:

```javascript
navigator.register([
  { key: HomePage, component: createHome(navigator)(update),
    route: "/" },

  { key: CoffeePage, component: coffeeComponent,
    route: "/coffee" },

  { key: CoffeeDetailsPage, component: coffeeComponent,
    route: "/coffee/:id" },

  { key: BeerPage, component: createBeer(navigator)(update),
    route: "/beer" },

  { key: BeerDetailsPage, component: createBeerDetails(navigator)(update),
    route: "/beer/:id" }
], createNotFound(navigator)(update));
```

Now, when the URL matches a route, we will do the equivalent of navigating to the corresponding page.

### Handling Routes

In the navigator, we'll need to handle routes.

In this example, we'll use [Navigo](https://github.com/krasimir/navigo). However, note that you can
use a different router with minimal effort. You only need to change the navigator to use your
preferred library. The rest of the application does not need to change. In fact, to demonstrate this,
we'll use a different library, [Navigation](https://grahammendick.github.io/navigation/), in the
[next section](04-Routing-C-Navigation.html).

Now, in the navigator, instead of constructing a map of navigation functions, we'll build Navigo
routes:

```javascript
const routes = {};
```

We can build a Navigo route with an `as` property to identify the route, and a `uses` property for
the navigation function:

```javascript
register: (configs, notFound) => {
  configs.forEach(config => {
    const component = config.component;
    componentMap[config.key] = component;

    // Function to update the model and set the page id and url
    const updateFunc = model =>
      Object.assign(model, { pageId: config.key, url: document.location.hash });

    routes[config.route] = {
      as: config.key,
      uses: params => {
        // If the component has a 'navigating' property, call it first, then compose
        // its update function with the one we defined above.
        if (component.navigating) {
          component.navigating(params, func => update(compose(func, updateFunc)));
        }
        // No 'navigating' property, so we only need to update the page id and url.
        else {
          update(updateFunc);
        }
      }
    };
  });
};
```

We use the `key` as the identifier, and the same navigation that we previously had for the
`uses` property. Navigo will automatically call the navigation function when a route matches.
We just need to create a Navigo instance and initialize it when the application starts:

```javascript
const router = new Navigo(null, true);

//...
const createNavigator = update => {
  const router = new Navigo(null, true);

  // ...

  return {
    register: (configs, notFound) => {
      // ...
    },
    getUrl: (id, params) => router.generate(id, params),
    navigateTo: (id, params) => router.navigate(router.generate(id, params)),
    start: () => router.on(routes).resolve()
  };
};
```

We've also added the `getUrl` function, which uses Navigo's `generate`, to produce the URL for
a given page id and parameters. Now, the `navigateTo` function uses `generate` and passes the URL
to Navigo's `navigate` function.

We can now call `getUrl` to create links, and we can still call `navigateTo` for buttons in the same
way.

### Using Routes

The only two changes we need to make to the application are to start the navigation:

```javascript
const createApp = update => {
  const navigator = createNavigator(update);

  navigator.register([ ... ]);

  navigator.start();

  // ...
};
```

And to use `getUrl` in our links:

```javascript
<a href={navigator.getUrl(HomePage)}>Home</a>
<a href={navigator.getUrl(CoffeePage)}>Coffee</a>
<a href={navigator.getUrl(BeerPage)}>Beer</a>

<a href={navigator.getUrl(CoffeeDetailsPage, { id: coffee.id })}
>{coffee.title}</a>

<a href={navigator.getUrl(BeerDetailsPage, { id: beer.id })}
>{beer.title}</a>
```

Now, navigating to a URL, whether with a link, by typing into the browser's location bar, or using
the browser's back and forward buttons, our route handling functions get called, update the model,
and display the corresponding page.

### Development Only: Using the Meiosis Tracer

Using the Meiosis Tracer, we'd like to see the corresponding URL in the browser's location bar when
we go back in the history of the application states. We can do this by looking at the URL in the
model and by comparing it to the current location. If they are different, we update the location
bar using `window.history.pushState`:

```javascript
// For development only, this code sets up the Meiosis Tracer.
const tracerElement = document.createElement("div");
tracerElement.id = "tracer";
tracerElement.style = "position: absolute; top: 0; right: 0";
element.parentNode.insertBefore(tracerElement, element.nextSibling);

meiosis.trace({ update, dataStreams: [ models ]});
meiosisTracer({ selector: "#tracer" });

// Display the url in the browser's location bar.
models.map(model => {
  const url = model.url;
  if (url && document.location.hash !== url) {
    window.history.pushState({}, "", url);
  }
});
```

Now, tracing through history reflects the correct URL.

[Table of Contents](toc.html)

-----

[Meiosis](http://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
