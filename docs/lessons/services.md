# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html) | [Documentation Examples](http://meiosis.js.org/docs-examples.html)

## Services

All credit goes to [James Forbes](https://james-forbes.com) for his idea of **services**, and I am
grateful to James for sharing this and other ideas that have significantly improved Meiosis.

James explains that while one-off actions occur after click events, user input, and so on, services
are for ongoing state synchronization. They can produce computed properties, store and retrieve
state from local storage, and trigger other actions.

In this section, we will look at how services work in Meiosis.

### Services Overview

![Services](services.svg)

In Meiosis, **services** are functions that run every time there is an update. Services can alter
the state _before_ the final state arrives onto the `states` stream. To change the state, services
return patches which are applied to the state. After all services have executed, the resulting state
arrives onto states stream, and the view is rendered.

After the view has rendered, **effects** can trigger more updates. Effects are functions that may
call `update` or `actions` to trigger more updates.

### Services

A service function receives `state` and returns a patch to alter the state. If a service does not
need to alter the state, it simply does not return a patch.

Service functions run **synchronously** and **in order**. Thus, a service can depend on the changes
made by a previous service.

We can use service functions for computed properties, setting up an initial blank state for a page,
cleaning up state after leaving a page, and any other state changes that we want to perform
synchronously before rendering the view.

### Effects

Effect functions receive `state` and may make asynchronous calls to `update` and/or `actions` to
trigger more updates. Since triggering an update will call the effect again, **effect functions must
change the state in a way that will avoid an infinite loop**.

Effects are good for tasks such as loading asynchronous data or triggering other types of
asynchronous updates, saving state to local storage, and so on.

### Pattern Setup

Let's see how we can set up services and effects with Meiosis. We'll start with our `update` stream:

```javascript
const update = stream();
```

Next comes our accumulator function. This function needs to ignore `null` or `undefined` patches.
That way, we can write services that don't return anything when they don't need to alter the state.

If we're using [Mergerino](https://github.com/fuzetsu/mergerino), the accumulator is `merge`. This
function already ignores empty patches.

```javascript
// Using Mergerino:
const accumulator = merge;
```

If we're using
[function patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html), we make a
slight adjustment to check whether the patch is truthy before applying it. If it is not, we ignore
the patch and just return the state unchanged.

```javascript
// Using Function Patches:
const accumulator = (state, patch) => patch ? patch(state) : state;
```

Next, we'll write a function that runs services. The function calls each service, accumulating state
by calling the `accumulator`:

```javascript
const runServices = startingState =>
  app.services.reduce(
    (state, service) => accumulator(state, service(state)),
    startingState
  );
```

Now, we can create our `states` stream with `scan`. We'll run the services on the initial state, as
well as in the accumulator function for `scan`:

```javascript
const states = scan(
  (state, patch) => runServices(accumulator(state, patch)),
  runServices(app.initial),
  update
);
```

Next, we create our actions and effects:

```javascript
const actions = app.Actions(update, states);
const effects = app.Effects(update, actions);
```

Finally, we trigger effects whenever the state changes. This is simply a matter of calling each
effect function and passing the `state`:

```javascript
states.map(state =>
  effects.forEach(effect => effect(state))
);
```

All together, here is our pattern setup:

```javascript
const update = stream();

// Using Mergerino:
const accumulator = merge;

// Using Function Patches:
const accumulator = (state, patch) => patch ? patch(state) : state;

const runServices = startingState =>
  app.services.reduce(
    (state, service) => accumulator(state, service(state)),
    startingState
  );

const states = scan(
  (state, patch) => runServices(accumulator(state, patch)),
  runServices(app.initial),
  update
);

const actions = app.Actions(update, states);
const effects = app.Effects(update, actions);

states.map(state => effects.forEach(effect => effect(state)));
```

Our pattern setup is complete, and we can wire up the view using `states`, `update`, and `actions`.

### Using Services and Effects

Let's look at an example using services and effects.

Say we have an app with three pages: Home, Login, and Data. We'll use services and effects to
achieve the following:

- Set up a blank form when going to the Login page
- Clean up the form when leaving the Login page
- Change the state to "loading" when going to the Data page
- Load the data asynchronously for the Data page
- Clean up the data when leaving the Data page.

We'll use these properties in the state:

- `page` to indicate the current page: `"Home"`, `"Login"`, `"Data"`
- `login` with `username` and `password` for the Login form
- `data` to indicate `"loading"` or an array of data for the Data page.

The login service checks whether the current page is `"Login"`. If so, and the login form has not
yet been set up, it returns a patch to set up the form with a blank username and password.

If the current page is not `"Login"`, and the login form is still present, the service returns a
patch to remove the login form from the state.

```javascript
const loginService = state => {
  if (state.page === "Login") {
    if (!state.login) {
      return { login: { username: "", password: "" } };
    }
  } else if (state.login) {
    return { login: undefined };
  }
};
```

The data service checks whether the current page is `"Data"`. If so, and `data` has not been set,
the service sets the data to `"loading"`. The view uses this to display a `Loading, please wait...`
message.

If the current page is not `"Data"`, the service clears the `data` property if it is present.

```javascript
const dataService = state => {
  if (state.page === "Data") {
    if (!state.data) {
      return { data: "loading" };
    }
  } else if (state.data) {
    return { data: undefined };
  }
};
```

Finally, the data effect checks to see if the `data` property is `"loading"`, in which case it calls
`actions.loadData`, which simulates loading data asynchronously.

Our `app` contains the `initial` state, the `Actions` constructor function, the array of `services`,
and the `Effects` constructor function which returns an array of effects.

```javascript
const DataEffect = actions => state => {
  if (state.data === "loading") {
    actions.loadData();
  }
};

const app = {
  initial: {
    page: "Home"
  },

  Actions: update => ({
    loadData: () =>
      setTimeout(
        () =>
          update({
            data: ["One", "Two"]
          }),
        1500
      )
  }),

  services: [loginService, dataService],

  Effects: (_update, actions) => [DataEffect(actions)]
};
```

You can see the complete example in action below.

@flems code/services/index-mergerino.js,app.html mithril,mithril-stream,mergerino 700 60

<a name="conclusion"></a>
### [Conclusion](#conclusion)

In this section, we've augmented our Meiosis pattern setup with services and effects. We do not need
a lot of code for this setup; nevertheless, for your convenience, you can also use the same setup by
adding [meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup#meiosis-setup)
to your project.

We can use services for computed properties, state synchronization, and other purposes. Please note,
however, that not everything belongs in a service, so it's important to avoid getting carried away.

-----

[Table of Contents](toc.html) | [Documentation Examples](http://meiosis.js.org/docs-examples.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
