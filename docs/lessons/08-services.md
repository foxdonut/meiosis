# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](07-views.html) |
[Next >](09-nesting.html) |
[Table of Contents](toc.html)

## 08 - Services

All credit goes to [James Forbes](https://james-forbes.com) for his idea of **services**. I am very
grateful to James for sharing this and other ideas that have significantly contributed to my Meiosis
journey.

James explains that while one-off actions occur after click events, user input, and so on, services
are for ongoing state synchronization. They can produce computed properties, store and retrieve
state from local storage, fetch data from a server, trigger other actions, and so on.

In this section, we will look at how services work in Meiosis.

### Services Overview

In Meiosis, **services** are functions that run every time the state changes. Services can alter the
state _before_ the final state arrives onto the `states` and `cells` streams. To change the state,
services call `cell.update(...)`, or call actions, in the same manner as views. After all services
have executed, the resulting state is rendered by the view.

Services can call `cell.update(...)` both synchronously and/or asynchronously (such as to load data
from a server.)

### Avoiding Infinite Loops

Because a service runs every time the state changes, and a service changes the state, we run the
risk of having an infinite loop. To avoid this, we'll use a function called `dropRepeats` (again,
credit to James) which takes a stream and an optional `onchange` function. The result is a new
stream that only produces a value if it is different from the previous value. By default, the value
is the stream's value. If the `onchange` function is provided by the caller, then the value returned
by that function is used to compare to the previous value.

Here is the `dropRepeats` function. Below it, you will see it in action.

- In the first example, `onchange` is the default, which is the value of the stream. The stream returned by `dropRepeats` only produces values that are different from the previous.
- In the second example, `onchange` is the value of the `counter` property. Notice that the stream
returned by `dropRepeats` only produces values when the `counter` value is different from the
previous. When the `label` value changes but the `counter` value is the same, the stream does not
produce a value.

@flems {"files":"code/08-drop-repeats.js","libs":"flyd","height":700}

By using `dropRepeats`, services don't need to worry about avoiding infinite loops.

### Services

A service function receives the current `cell` and can call `cell.update(...)` to alter the state.

We can use service functions for computed properties, setting up an initial blank state for a page,
cleaning up state after leaving a page, and any other state changes that we want to perform
synchronously before rendering the view.

Services can also call `cell.update(...)` asynchronously, such as loading data or triggering other
types of asynchronous updates.

Finally, services may perform side effects without changing the state, such as saving state to local
storage.

To define a service, we'll create an object with two properties:

- `onchange`: a function that receives the state and returns a value.
- `run`: a function that gets called when the value returned by `onchange` changes. The `run`
function receives the current `cell`, from which it can read `cell.state` and call
`cell.update(...)` to update the state.

```js
const service = {
  onchange: (state) => state.someProperty,
  run: (cell) => {
    // ...
    cell.update(...);
  }
};
```

The `onchange` function is optional. If not provided, the `run` function gets called on every state
change.

### Pattern Setup

Let's see how we can set up services with Meiosis. We'll start with the base pattern:

```js
const update = m.stream();
const states = m.stream.scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });
```

Next, given a `services` array of services, for each service we'll use `dropRepeats`, passing the
service's `onchange`, and `map` the resulting stream to call the service's `run` function:

```js
services.forEach((service) => {
  dropRepeats(states, service.onchange).map((state) =>
    service.run(createCell(state))
  );
});
```

This will call each service and update the state as each service calls `cell.update`, with
`dropRepeats` avoiding infinite loops.

Finally, we'll create our `cells` stream also using `dropRepeats`:

```js
const cells = dropRepeats(states).map(createCell);
```

You can see the complete pattern setup below.

@flems {"files":"code/08-services-setup.js,app.html","libs":"mithril,mithril-stream,mergerino","height":700}

Notice that for Mithril we're using `m.redraw` to make sure the view is re-rendered because we're
updating the state with services, thus outside of Mithril's auto-redraw scope.

### Services - Example

Let's look at an example using services.

Say we have an app with three pages: Home, Login, and Data. We'll use services to achieve the
following:

- Set up a blank form state when going to the Login page
- Clear out the form state when leaving the Login page
- Change the state to "loading" when going to the Data page
- Load the data asynchronously for the Data page
- Clear out the data when leaving the Data page.

We'll use these properties in the state:

- `page` to indicate the current page: `"Home"`, `"Login"`, `"Data"`
- `login` with `username` and `password` for the Login form
- `data` to indicate `"loading"` or an array of data for the Data page.

The login service checks whether the current page is `"Login"`. If so, and the login form has not
yet been set up, it updates the state to set up the form with a blank username and password.

If the current page is not `"Login"`, the service removes the login form from the state.

```js
const loginService = {
  // call the service when the page changes
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === "Login") {
      cell.update({
        login: { username: "", password: "" }
      });
    } else {
      cell.update({ login: undefined });
    }
  }
};
```

The data service checks whether the page has changed to `"Data"`. If so, the service sets the state
data to `"loading"`. The view uses this to display a `Loading, please wait...` message. The service
calls `actions.loadData` to simulate loading data asynchronously from a server.

If the page has changed to something other than `"Data"`, the service clears the `data` property
from the state.

```js
const actions = {
  loadData: (cell) =>
    setTimeout(
      () =>
        cell.update({
          data: ['One', 'Two']
        }),
      1500
    )
};

const dataService = {
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === "Data") {
      cell.update({ data: "loading" });
      actions.loadData(cell);
    } else {
      cell.update({ data: undefined });
    }
  }
};
```

Our `app` contains the `initial` state, the array of `services`, and the view:

```js
const app = {
  initial: {
    page: "Home"
  },

  services: [loginService, dataService],

  view: (cell) => ...
};
```

You can see the complete example in action below.

@flems {"files":"code/08-services-example.js,app.html","libs":"mithril,mithril-stream,mergerino","height":700}

<a name="conclusion"></a>
### [Conclusion](#conclusion)

In this section, we've augmented our Meiosis pattern setup with services. We do not need a lot of
code for this setup; nevertheless, for your convenience, you can also use the same setup by adding
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup) to your
project.

-----

[< Previous](07-views.html) |
[Next >](09-nesting.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
