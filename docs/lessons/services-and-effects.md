# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Services and Effects

All credit goes to [James Forbes](https://james-forbes.com) for his idea of _Services_, and I am
grateful to James for sharing this and other ideas that have significantly improved what is possible
with Meiosis.

In this section, we will look at how Services and Effects work in Meiosis. This is a slightly
different approach to James' services, which is described in the [Services](services.html) section.

### Services and Effects Overview

In Meiosis, _services_ are functions that run on every update. These functions can alter the state
_before_ the final state is produced. To achieve this, services can return patches which are applied
to the state. After all services have executed, the resulting state is sent to the view.

After the view has re-rendered, _effects_ can trigger more updates. Effects are functions that may
call `update` or `actions` to trigger more updates. Typically, effects are for asynchronous updates,
such as fetching data from the server.

### Services

A service function receives `({ state, previousState, patch })` and returns a patch.

Service functions run **synchronously** and **in order**. Thus, a service can depend on the changes
made by a previous service.

### Effects

Effect functions receive `({ state, previousState, patch, update, actions })` and make asynchronous
calls to `update` and/or `actions`.

Our app component structure is thus:

```javascript
const app = {
  initial: initialState,
  Actions: (update, getState) => actions,
  services: [({ state, previousState, state }) => patch?],
  effects: [({ state, prevousState, patch, update, actions }) => void]
};
```

### Using Mergerino

In this section, we'll use [Mergerino](https://github.com/fuzetsu/mergerino), which we looked at in
the [tutorial](http://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html). The pattern would
work the same way with
[function patches](http://meiosis.js.org/tutorial/04-meiosis-with-function-patches.html).

To use Mergerino, we emit patches as objects and we use `merge` as our accumulator:

```javascript
const states = m.stream.scan(merge, initial, update);
```

Each service function takes the state and may return a patch object.

A service function does not need to return anything, however. The `storage.service` function is one
such function, as it only stores the state into local storage:

```javascript
const storage = {
  service: ({ state }) => {
    localStorage.setItem(
      "v1",
      JSON.stringify({ boxes: state.boxes })
    );
  }
};
```

```javascript
// stream and scan come from flyd, simpleStream, Mithril Stream, ...

const update = stream();

// Using Mergerino:
const accumulator = merge;

// Using Function Patches:
const accumulator = (state, patch) => patch ? patch(state) : state;

// a context has { state, previousState, patch }
const contexts =
  // scan to apply patches
  scan(
    (context, patch) => ({
      previousState: context.state,
      state: accumulator(context.state, patch),
      patch
    }),
    { state: app.initial, previousState: {} },
    update
  )
  // run services
  .map(context =>
    app.services.reduce((context, service) => Object.assign(context, {
      state: accumulator(context.state, service(context))
    }), context)
  );

// the states stream just extracts the state from the context
const states = contexts.map(context => context.state);

const actions = app.Actions(update, states);

// apply effects
contexts.map(context => {
  app.effects.map(effect => effect(Object.assign(context, { update, actions })))
});
```

You will find the complete example below.

@flems code/services-and-effects/index-mergerino.js,app.html mithril,mithril-stream,mergerino 700 60

<a name="conclusion"></a>
### [Conclusion](#conclusion)

-----

**For more examples of using services and effects, please see the
[Meiosis Routing](http://meiosis.js.org/docs/routing.html) documentation.**

-----

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
