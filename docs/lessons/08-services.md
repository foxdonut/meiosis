# [Meiosis](https://meiosis.js.org) Documentation

[< Previous](07-views.html) |
[Next >](09-nesting.html) |
[Table of Contents](toc.html)

## 08 - Services

All credit goes to [James Forbes](https://james-forbes.com) for his idea of **services**, and I am
grateful to James for sharing this and other ideas that have significantly improved Meiosis.

James explains that while one-off actions occur after click events, user input, and so on, services
are for ongoing state synchronization. They can produce computed properties, store and retrieve
state from local storage, and trigger other actions.

In this section, we will look at how services work in Meiosis.

### Services Overview

![Services](services.svg)

In Meiosis, **services** are functions that run every time the state changes. Services can alter the
state _before_ the final state arrives onto the `states` and `cells` streams. To change the state,
services call `cell.update(...)`, or call actions, in the same manner as views. After all services
have executed, the resulting state is rendered by the view.

Services can call `cell.update(...)` both synchronously and/or asynchronously (such as to load data
from a server.)

### Avoiding Infinite Loops

```js
const dropRepeats = (
  states,
  onchange = (state) => state
) => {
  let prev = undefined;
  const result = stream();

  states.map((state) => {
    const next = onchange(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};
```

### Services

A service function receives the current `cell` and can call `cell.update(...)` to alter the state.

We can use service functions for computed properties, setting up an initial blank state for a page,
cleaning up state after leaving a page, and any other state changes that we want to perform
synchronously before rendering the view.

Services can also call `cell.update(...)` asynchronously, such as loading data or triggering other
types of asynchronous updates.

Finally, services may perform side effects without changing the state, such as saving state to local
storage.

### Pattern Setup

Let's see how we can set up services with Meiosis. We'll start with our `update` stream:

```js
const update = stream();
```

All together, here is our pattern setup:

```js
const dropRepeats = (
  states,
  onchange = (state) => state
) => {
  let prev = undefined;
  const result = stream();

  states.map((state) => {
    const next = onchange(state);
    if (next !== prev) {
      prev = next;
      result(state);
    }
  });
  return result;
};

const update = stream();
const states = scan(merge, app.initial, update);
const createCell = (state) => ({ state, update });

app.services.forEach((service) => {
  dropRepeats(states, service.onchange).map((state) =>
    service.run(createCell(state))
  );
});

const cells = dropRepeats(states).map(createCell);
```

Our pattern setup is complete.

### Services - Example

Let's look at an example using services.

Say we have an app with three pages: Home, Login, and Data. We'll use services to achieve the
following:

- Set up a blank form when going to the Login page
- Clear out the form when leaving the Login page
- Change the state to "loading" when going to the Data page
- Load the data asynchronously for the Data page
- Clear out the data when leaving the Data page.

We'll use these properties in the state:

- `page` to indicate the current page: `"Home"`, `"Login"`, `"Data"`
- `login` with `username` and `password` for the Login form
- `data` to indicate `"loading"` or an array of data for the Data page.

The login service checks whether the current page is `"Login"`. If so, and the login form has not
yet been set up, it returns a patch to set up the form with a blank username and password.

If the current page is not `"Login"`, and the login form is still present, the service returns a
patch to remove the login form from the state.

```js
const loginService = {
  onchange: (state) => state.page,
  run: (cell) => {
    if (cell.state.page === "Login") {
      cell.update({
        login: { username: "", password: "" }
      });
    } else {
      return cell.update({ login: undefined });
    }
  }
};
```

The data service checks whether the current page is `"Data"`. If so, and `data` has not been set,
the service sets the data to `"loading"`. The view uses this to display a `Loading, please wait...`
message.

If the current page is not `"Data"`, the service clears the `data` property if it is present.

```js
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

Finally, the data effect checks to see if the `data` property is `"loading"`, in which case it calls
`actions.loadData`, which simulates loading data asynchronously.

Our `app` contains the `initial` state, the `Actions` constructor function, the array of `services`,
and the `Effects` constructor function which returns an array of effects.

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

@flems {"files":"code/08-services.js,app.html","libs":"mithril,mithril-stream,mergerino","height":700,"selected":60}

<a name="conclusion"></a>
### [Conclusion](#conclusion)

In this section, we've augmented our Meiosis pattern setup with services. We do not need a lot of
code for this setup; nevertheless, for your convenience, you can also use the same setup by adding
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup) to your
project.

We can use services for computed properties, loading data, state synchronization, and other
purposes. Please note, however, that not everything belongs in a service, so it's important to be
careful not to get carried away.

-----

[< Previous](07-views.html) |
[Next >](09-nesting.html) |
[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by foxdonut ([Twitter](http://twitter.com/foxdonut00) /
[GitHub](https://github.com/foxdonut)) and is released under the MIT license.
