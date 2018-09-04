# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Routing - Navigation Without Routes

In this part of the Meiosis Documentation, we will look at routing. We'll use the simple page
navigation example shown below.

![Routing](routing-example.gif)

### Running the Example

To run this example (and every example in the Documentation):

```
git clone https://github.com/foxdonut/meiosis
cd meiosis/docs
npm i
npm start
```

Then open [http://localhost:9000](http://localhost:9000) to view the example index, and click on
the specific example.

The code for the examples is located in `meiosis/docs/code`. You can edit code there and reload
the page in your browser to see your changes.

### Starting Without Routes

Routing does not have to be so notoriously difficult and complicated. We'll start implementing
the application without routes, using the model as our single source of truth (as always) and
actions to navigate to different pages. Then, we can add routes as simple mappings to actions.

### Defining Navigation

To identify the different pages of the application, we'll use simple constants:

```javascript
const HomePage = "HomePage";
const CoffeePage = "CoffeePage";
const BeerPage = "BeerPage";
const BeerDetailsPage = "BeerDetailsPage";
```

Then, to indicate which page we're on, we'll assign the current page id to the model.

```javascript
{
  pageId: "HomePage"
};
```

To display the current page, we'll simply look up the component that corresponds to the page id.

```javascript
view: model => {
  const component = navigator.getComponent(model.pageId);
  // ...
  return (
    <div>
      {component.view(model)}
    </div>
  );
}
```

### Creating the Navigator

In the code above, we called `navigator.getComponent` to retrieve the component for a page id.
Let's see how we create this navigator.

```javascript
const createNavigator = update => {
  const componentMap = {};

  return {
    register: configs => {
      configs.forEach(config => {
        const component = config.component;
        componentMap[config.key] = component;
      });
    },
    getComponent: pageId => componentMap[pageId]
  };
};
```

The navigator has a `componentMap` object to keep track of components associated to page ids.
We pass a list of component configurations to the `register` function, where each configuration
has a `key` for the page id and a `component` property for the associated component:

```javascript
const createApp = update => {
  const navigator = createNavigator(update);

  navigator.register([
    { key: HomePage, component: createHome(navigator)(update) },
    { key: CoffeePage, component: createCoffee(navigator)(update) },
    { key: BeerPage, component: createBeer(navigator)(update) },
    { key: BeerDetailsPage, component: createBeerDetails(navigator)(update) }
  ]);

  // ...
};
```

Next, we want a want to navigate to a different page. We'll add a `navigateTo` function to our
navigator:

```javascript
const navigateToMap = {};
// ...
navigateToMap[config.key] = params => {
  const updateFunc = model => Object.assign(model, { pageId: config.key });
  update(updateFunc);
};
// ...
navigateTo: (id, params) => {
  const target = navigateToMap[id];
  if (target) {
    target(params);
  }
}
```

Now, we can navigate to a page using a link:

```javascript
<a onClick={() => navigator.navigateTo(CoffeePage)}>Coffee</a>
```

Or a button:

```javascript
<button onClick={_evt => navigator.navigateTo(CoffeePage)}>Coffee</button>
```

### Loading Data Before Navigating

Sometimes we want to do something before navigating to a page, such as loading data. To implement
this, we'll add support for a `navigating` property on a component. If that property is defined,
the navigator will call that function before navigating to a page.

The `navigating` function receives the navigation parameters and a callback function, `navigate`,
for sending the navigator a model-updating function that we'd normally pass to `update()`. The
navigator combines this function with the update that sets the current page id on the model.

For example, let's say we want to load the coffees on the Coffee page. Further, if there is a
parameter id, we also want to load the details for that coffee. We can write a `navigating`
function on the coffee component:

```javascript
const coffees = [
  { id: "c1", title: "Coffee 1", description: "Description of Coffee 1" },
  { id: "c2", title: "Coffee 2", description: "Description of Coffee 2" }
];

const coffeeMap = coffees.reduce((result, next) => {
  result[next.id] = next;
  return result;
}, {});

const createCoffee = navigator => _update => ({
  navigating: (params, navigate) => {
    if (params && params.id) {
      const coffee = coffeeMap[params.id];
      navigate(model => Object.assign(model, { coffees, coffee: coffee.description }));
    }
    else {
      navigate(model => Object.assign(model, { coffees, coffee: null }));
    }
  },
  // ...
});
```

To support this in the navigator, we check whether the component has a `navigating` property.
In that case, we pass it the navigation parameters and a callback function so that we can
compose the component's model update with the update to assign the page id:

```javascript
navigateToMap[config.key] = params => {
  // Function to update the model and set the page id
  const updateFunc = model => Object.assign(model, { pageId: config.key });

  // If the component has a 'navigating' property, call it first, then compose
  // its update function with the one we defined above.
  if (component.navigating) {
    component.navigating(params, func => update(compose(func, updateFunc)));
  }
  // No 'navigating' property, so we only need to update the page id.
  else {
    update(updateFunc);
  }
};
```

### Asynchronous Loading

What if we are loading the data asynchronously? No problem, we just need to call the `navigate`
function when the data loading has completed:

```javascript
const beers = [
  { id: "b1", title: "Beer 1", description: "Description of Beer 1" },
  { id: "b2", title: "Beer 2", description: "Description of Beer 2" }
];

const loadBeers = () => new Promise(resolve =>
  setTimeout(() => resolve(beers), 1000));

const createBeer = navigator => update => ({
  navigating: (_params, navigate) => {
    loadBeers().then(beers => {
      navigate(model => Object.assign(model, { beers }));
    });
  },
  // ...
});
```

### Showing a "Loading, Please Wait" Modal

If loading data takes some time, we may want to show a "Loading, Please Wait" modal while the
data is loading. We can use a `pleaseWait` indicator on the model, setting it to `true` as soon
as we are navigating to the page, and then to `false` once the data loading has completed.

```javascript
const createBeer = navigator => update => ({
  navigating: (_params, navigate) => {
    update(model => Object.assign(model, { pleaseWait: true }));

    loadBeers().then(beers => {
      navigate(model => Object.assign(model, { pleaseWait: false, beers }));
    });
  },
  // ...
});
```

Then, on the main view of our application, we can show or hide the modal according to the
`pleaseWait` indicator:

```html
<div style={{visibility: model.pleaseWait ? "visible" : "hidden"}}>
  <div className="modal">
    <div className="box">
      <p>Loading, please wait...</p>
    </div>
  </div>
</div>
```

We can use some simple CSS to style the modal:

```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  padding: 30px;
  background: white;
  text-align: center;
}
```

This will shade the background and prevent clicking while showing the "Loading, please wait..."
message in a white centered box.

### Up Next

In the [next section](04-Routing-B-Adding-Routes.html), we'll add routes to the example.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by [@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut) and is released under the MIT license.
