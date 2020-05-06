# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Services and Effects

All credit goes to [James Forbes](https://james-forbes.com) for his idea of _Services_, and I am
grateful to James for sharing this and other ideas that have significantly improved what is possible
with Meiosis.

In this section, we will look at how Services and Effects work in Meiosis. This is a slightly
different approach to James' services, which is described in the [Services](services.html) section.

### Services and Effects Overview

![Services and Effects](services-and-effects.svg)

In Meiosis, **services** are functions that run every time there is an update. Services can alter
the state _before_ the final state is sent to the `states` stream. To change the state, services
return patches which are applied to the state. After all services have executed, the resulting state
is sent to the states stream, and the view is rendered.

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

Effect functions receive `state` and can make asynchronous calls to `update` and/or `actions` to
trigger more updates. Since triggering an update will call the effect again, **effect functions must
change the state in a way that will avoid an infinite loop**.

Effects are good for tasks such as loading asynchronous data or triggering other types of
asynchronous updates.

### Pattern Setup

Let's see how we can set up services and effects with Meiosis. We'll start with our `update` stream:

```javascript
const update = stream();
```

Next, our accumulator function. This function needs to ignore `null` or `undefined` patches. That
way, we can write services that don't return anything when they don't need to alter the state.

If we're using [Mergerino](https://github.com/fuzetsu/mergerino), the accumulator is `merge`. This
function already ignores empty patches.

```javascript
// Using Mergerino:
const accumulator = merge;
```

If we're using
[function patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html), we make a
slight adjustment to check whether the patch is truthy before applying it. Otherwise, we just return
the state.

```javascript
// Using Function Patches:
const accumulator = (state, patch) => patch ? patch(state) : state;
```

Next, we'll write a function run services. The function calls each service, accumulating state by
calling `accumulator`:

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

states.map(state =>
  effects.forEach(effect => effect(state))
);
```

Something more here..

### Using Services and Effects

Try out and experiment with the complete example below.

@flems code/services-and-effects/index-mergerino.js,app.html mithril,mithril-stream,mergerino 700 60

<a name="conclusion"></a>
### [Conclusion](#conclusion)

-----

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
