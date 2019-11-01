# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Services

[James Forbes](https://james-forbes.com) shared his idea of _Services_. In this section, we'll look
at James' version using streams, and another version using
[meiosis-setup](https://github.com/foxdonut/meiosis/tree/master/helpers/setup)
with [Daniel Loomer](https://github.com/fuzetsu)'s
[Mergerino](https://github.com/fuzetsu/mergerino).

James explains that while one-off actions occur after click events, user input, and so on,
services are for ongoing state synchronization. They can produce computed properties, store and
retrieve state from local storage, and trigger other actions.

<a name="using_streams"></a>
### [Using Streams](#using_streams)

James' version uses streams to implement services. The structure is as follows:

```javascript
{
  initial: state => initialState,
  start: states => patches
}
```

A service has an `initial` function which produces the service's initial state. The `start`
function takes the Meiosis **stream** of states and returns a **stream** of patches. The
service emits patches onto this stream.

The application's initial state is combined with each service's initial state to produce the
final initial state:

```javascript
const services = [ /* ... */ ];

const initialState = () => {
  const state = {
    boxes: [],
    colors: ["red", "purple", "blue"]
  };
  return Object.assign(
    {},
    state,
    services.map(s => s.initial(state)).reduce(R.merge, {})
  );
};
```

Then, every service is started by passing in the stream of states, and mapping the resulting stream
of patches onto the `update` stream:

```javascript
services.map(s => s.start(states).map(update));
```

When a service emits a patch onto its stream, it is passed on to the `update` stream.

#### Colored Boxes Example

James shared an example where you have colored boxes that you can click on to add them to a list.
The boxes are displayed one next to the other, with a description of how many boxes of each color
are in the list. You can remove a box from the list by clicking on it.

> Note that the example code is somewhat different that the "Meiosis style". There are some nifty
functional programming at play here, and you can learn some nice techniques from this code. But if
you are having some trouble understanding, please know that the code in the next section uses a
style that is closer to what we have been using so far.

In the example, there are three services:

- `StatsService`: produces an object that indicates how many boxes of each color.
- `LocalStorageService`: stores and retrieves the box data to and from local storage. You will
notice that the box list remains even after reloading the page.
- `DescriptionService`: produces the text description of how many boxes of each color are in
the list.

Each service has an `initial` and `start` function. For example, the `StatsService` initializes its
state with `0` for every box color, and computes the number of instances of each color:

```javascript
const StatsService = {
  initial(state) {
    return state.colors
      .map(R.objOf)
      .map(K(0))
      .reduce(R.merge, {});
  },
  start(state) {
    return dropRepeats(state.map(x => x.boxes))
      .map(R.countBy(I))
      .map(R.assoc("stats"));
  }
};
```

Notice the call to `dropRepeats`. This is necessary because the stream of patches produced by the
service is fed back into the Meiosis `update` stream. This in turn produces an updated state, which
triggers the service again. To avoid an infinite loop, `dropRepeats` does not emit a value when it
is the same as the previous one:

```javascript
function dropRepeats(s) {
  var ready = false;
  var d = m.stream();
  s.map(function (v) {
    if (!ready || v !== d()) {
      ready = true;
      d(v);
    }
  });
  return d;
}
```

The example uses function patches. Here is the setup for the Meiosis pattern:

```javascript
const update = m.stream();
const T = (x, f) => f(x);
const state = m.stream.scan(T, initialState(), update);
const element = document.getElementById("app");
states.map(view(update)).map(v => m.render(element, v));
```

The complete example is below.

@flems code/services/index-streams.js,app.html mithril,mithril-stream,ramda,bss 700 60

#### Flexibility

Using streams gives you the flexibility of being able to hook into them and wiring them as you
wish.

<a name="using_meiosis_setup"></a>
### [Using Meiosis-Setup](#using_meiosis_setup)

In Meiosis, instead of having services return streams that emit patches, services return an object
that can be any combination of the following properties:

- `state`: to update the state
- `patch`: to change or cancel the current patch
- `render`: `false` to cancel the render
- `next`: to trigger more updates

A service function receives the previous state, the current patch, and the state with the current
patch applied.

Service functions run **synchronously** and **in order**. Thus, a service can depend on the changes
made by a previous service.

A service can return a `next` function which gets called for the next render cycle. This function
receives `({ state, patch, update, actions })` and can make synchronous and/or asynchronous calls to
`update` and/or `actions`.

Our component structure is thus:

```javascript
{
  initial: initialState,
  Actions: update => actions,
  service: ({ state, patch, previousState }) => ({ state, patch, render, next })
}
```

#### With Mergerino

In this section, we'll use [Mergerino](https://github.com/fuzetsu/mergerino), which we looked at in
the [tutorial](http://meiosis.js.org/tutorial/05-meiosis-with-mergerino.html).

To use Mergerino, we emit patches as objects and we use `merge` as our accumulator:

```javascript
const states = m.stream.scan(merge, initial, update);
```

Remember that previously, we had a stats service and a description service:

- `StatsService`: produces an object that indicates how many boxes of each color.
- `DescriptionService`: produces the text description of how many boxes of each color are in
the list.

These services are now:

```javascript
const stats = {
  service: ({ state }) =>
    R.applyTo(
      state,
      R.pipe(
        x => x.boxes,
        R.countBy(I),
        R.always,
        R.objOf("stats"),
        R.objOf("state")
      )
    )
};

const description = {
  service: ({ state }) =>
    R.applyTo(
      state,
      R.pipe(
        x => x.stats,
        R.toPairs,
        R.groupBy(R.last),
        R.map(R.map(R.head)),
        R.map(humanList("and")),
        R.toPairs,
        R.map(R.join(" ")),
        humanList("and"),
        x => x + ".",
        R.objOf("description"),
        R.objOf("state")
      )
    )
};
```

Each service function takes the state and returns a `{ state: patch }` object.

A service function does not need to return anything, however. The `storage.service` function is one such function, as it only stores the state into local storage:

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

You will find the complete example below.

@flems code/services/index-mergerino.js,app.html mithril,mithril-stream,ramda,bss,meiosis-setup,mergerino 700 60

<a name="conclusion"></a>
### [Conclusion](#conclusion)

We can wire up services in different ways, and use them for computed properties, state
synchronization, and other purposes. Please note, however, that not everything belongs in a service,
so it's important to avoid getting carried away.

[Table of Contents](toc.html)

-----

[Meiosis](https://meiosis.js.org) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) /
[foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
