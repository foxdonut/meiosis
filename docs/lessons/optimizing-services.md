# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Optimizing Services

Services, which we used in [Services and Accepted State](services.html) as well as in the
[SAM Pattern](sam-pattern.html), are working fine, but could be improved:

- Every time a service calls `update`, itself and all other services are triggered again;
- State changes are emitted for every call to `update`, refreshing the view each time;
- Since a service gets called again after `update`, we have to be careful to avoid infinite
loops.

These issues are not necessarily problematic. Multiple updates, service triggers, and view
refreshes can be very fast and not cause performance problems. We avoid infinite loops by
managing conditions under which services call `update`.

Nevertheless, if we have a little more code in the setup, we can enjoy these benefits:

- The freedom to call `update` as many times as necessary, knowing that all service updates
are combined into a single state change and a single view refresh;
- Services only get triggered **once**, so we don't have to worry about infinite loops.

> **NOTE:** The rest of this section explains how we can setup Meiosis to optimize services. If you
do not want to have to copy this code into your project, or even don't want to read the details of
the optimized setup, please know that you can simply use
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup) and benefit from
the optimizations mentioned above. The helpers in `meiosis-setup` make it simple to setup the
Meiosis pattern in your application.

<a name="base_pattern"></a>
### Our Meiosis Setup So Far

```javascript
// -- Meiosis pattern setup code

const update = flyd.stream();
const actions = app.Actions(update);

const accept = state =>
  app.acceptors.reduce(
    (updatedState, acceptor) =>
      O(updatedState, acceptor(updatedState)),
    state
  );

const states = flyd.scan(
  (state, patch) => accept(O(state, patch)),
  accept(app.Initial()),
  update
);

states.map(state =>
  app.services.forEach(service =>
    service({ state, update, actions })
  )
);

ReactDOM.render(
  <App states={states} actions={actions} />,
  document.getElementById("app")
);
```

In the example below, we have an `accept` function that sets the `leave` and `arrive` properties
on the state, indicating when we leave from and arrive to a page. Services can use this information
to load or unload its page data.

We have two pages that use this, Data and About. Services load and unload the `data` and `about`
properties for their respective pages.

To see how many state changes are happening, a counter and a state change are logged to the
console.

Try it out below. When you go from the Data page to the About page, there are 4 state changes:

1. the `pageId` changes
1. the Data service unloads its data
1. the About page displays its "please wait" message
1. the About page asychronously loads its data.

@flems code/optimizing-services/base-pattern.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

Each state change means that services are called again. Let's start reducing the number of state
changes and service calls by buffering and combining updates.

<a name="buffered_combined_updates"></a>
### Buffering and Combining Updates

To combine updates into one, we need a function that takes an array of patches and combines them
into a single patch. With Patchinko, we can do this:

```javascript
const combine = patches => model =>
  patches.reduce((m, p) => O(m, p), model);
```

The patch is a function takes the model and applies all the patches.

With Function Patches, combining updates into one is simply function composition:

```javascript
const combine = fns => args => fns.reduceRight((arg, fn) => fn(arg), args);
```

Next, we'll set up a buffered update function. When the `buffered` flag is `true`, updates are
saved into a buffer.

```javascript
// -- Buffered updates

let buffered = false,
  buffer = [];

const bufferedUpdate = patch => {
  if (buffered) {
    buffer.push(patch);
  } else {
    update(patch);
  }
};

const actions = app.Actions(bufferedUpdate);
```

Finally, we'll use the buffer to accumulate updates from services, and combine them into a single
`update`:

```javascript
states.map(state => {
  buffered = true;
  buffer = [];

  app.services.forEach(service =>
    service({ state, update: bufferedUpdate, actions })
  );
  if (buffer.length > 0) {
    // Combine updates into one
    update(combine(buffer));
  } else {
    buffered = false;
  }
});
```

Try it out below. Now, when you go from the Data page to the About page, there are 3 state changes:

1. the `pageId` changes
1. the Data service unloads its data, and the About page displays its "please wait" message;
these are combined into a single update
1. the About page asychronously loads its data.

@flems code/optimizing-services/buffered-combined-updates.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

We can do one better: combine the initial state change with the service updates into a single
state change, and not call services again after they have emitted their updates.

<a name="single_state_change"></a>
### Single State Change/View Refresh, No Infinite Loops

To combine the initial state change and service updates into a single state change, and to avoid
calling services again after they have issued their updates, we'll change the `states` stream to
`models` and create a separate `states` stream:

```javascript
const models = flyd.scan(...);

const states = flyd.stream();
```

Next, we'll add an indicator so that we know when we're dealing with service updates:

```javascript
let buffered = false,
  buffer = [];
  buffer = [],
  serviceUpdate = false;
```

Finally, we'll use the indicator to control when we emit a state change onto the `states`
stream. We'll only do so when there is a service update, or when services have no updates.
Moreover, when there is a service update, we are not calling services again.

```javascript
models.map(state => {
  // If the call comes from a service update, we just want to emit the resulting state.
  if (serviceUpdate) {
    serviceUpdate = false;
    buffered = false;
    states(state);
  } else {
    buffered = true;
    buffer = [];

    app.services.forEach(service =>
      service({ state, update: bufferedUpdate, actions })
    );
    if (buffer.length > 0) {
      // Services produced patches, issue an update and emit the resulting state.
      serviceUpdate = true;
      update(combine(buffer));
    } else {
      // No service updates, just emit the resulting state.
      buffered = false;
      states(state);
    }
  }
});
```

Try it out! Now, when you go from the Data page to the About page, there are 2 state changes:

1. the `pageId` changes, the Data service unloads its data, and the About page displays its
"please wait" message; these are all combined into a single update. Services are not called
again here.
1. the About page asychronously loads its data.

@flems code/optimizing-services/single-state-change.js,app.html,public/css/spectre.css react,react-dom,flyd,patchinko 700 60

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
