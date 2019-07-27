# [Meiosis](https://meiosis.js.org) Documentation

[Table of Contents](toc.html)

## Services and Accepted State

[James Forbes](https://james-forbes.com) shared his idea of _Services_. In this section, we'll look
at James' version using streams, and another version using a separate accepted state function and a
service trigger. For the latter, we'll use two variants, one with
[Barney Carroll](https://barneycarroll.com)'s
[Patchinko](https://github.com/barneycarroll/patchinko), and one with function patches.

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

<a name="using_accepted_and_services"></a>
### [Using Accepted State and Services](#using_accepted_and_services)

In Meiosis, instead of emitting patches from services, we define state management objects that can
have either one (or both) of these:

- an `accept` function
- a `service` function

An `accept` function gets the current state as a parameter and returns a patch to make any necessary
changes and updates to the state. Then, all accept functions are combined together to produce a
single `accept` function that receives the current state and produces the accepted state.

Accept functions, or _acceptors_, run **synchronously** and **in order**. Thus, an acceptor can
depend on the changes made by a previous acceptor.

For asynchronous changes, we define a `service` function that receives the current state and the
`update` stream, and decides whether to call `update`. Services can call `update` synchronously, as
well.

Our component structure is thus:

```javascript
{
  Initial: () => initialState,
  Actions: update => actions,
  accept: state => patch,
  service: ({ state, update }) => { /* call update() based on state */ }
}
```

#### With Patchinko

In this section, we'll use [Patchinko](https://github.com/barneycarroll/patchinko), which we looked
at in the [tutorial](http://meiosis.js.org/tutorial/05-meiosis-with-patchinko.html).

To use Patchinko, we emit patches as objects and we use `O` as our accumulator:

```javascript
const states = m.stream.scan(O, Initial(), update);
```

Remember that previously, we had a stats service and a description service:

- `StatsService`: produces an object that indicates how many boxes of each color.
- `DescriptionService`: produces the text description of how many boxes of each color are in
the list.

These become acceptors:

```javascript
const stats = {
  accept: R.pipe(
    x => x.boxes,
    R.countBy(I),
    R.objOf("stats")
  )
};

const description = {
  accept: R.pipe(
    x => x.stats,
    R.toPairs,
    R.groupBy(R.last),
    R.map(R.map(R.head)),
    R.map(humanList("and")),
    R.toPairs,
    R.map(R.join(" ")),
    humanList("and"),
    x => x + ".",
    R.objOf("description")
  )
};
```

Each accept function takes the state and returns a patch. Let's assemble the functions into a
top-level `accept` function that takes the state and returns the updated state. We can use `reduce`
on the array of `accept` functions, calling each function and applying the patch on the state with
`O`:

```javascript
const acceptors = [stats.accept, description.accept];

const accept = state =>
  acceptors.reduce(
    (updatedState, acceptor) =>
      O(updatedState, acceptor(updatedState)),
    state
  );
```

This gives us a single top-level `accept` function that takes the state, calls all acceptor
functions, and produces the updated state. We call `accept` after calling `O` in the accumulator
function of `scan`. Note that we also call `accept` on the initial state:

```javascript
const states = m.stream.scan(
  (state, patch) => accept(O(state, patch)),
  accept(app.Initial()),
  update
);
```

For asynchronous changes, such as loading data from a server, we'll separately define `service`
functions that receive the current state and the `update` stream, and call `update` as they see fit.

```javascript
service: ({ state, update }) => {
  // determine whether to call update() based on state
}
```

As in the previous section, we have to be careful about infinite loops. Indeed, when the service
calls `update()`, the service will be triggered again. Later, we will look at how we can optimize
services to avoid calling them again after they issue updates, and thus not have to worry about
infinite loops.

In this example, the `storage.service` function doesn't call `update`, so it's not an issue.

```javascript
const storage = {
  Initial: () => {
    const stored = localStorage.getItem("v1");
    return stored ? JSON.parse(stored) : {};
  },

  service: ({ state }) => {
    localStorage.setItem(
      "v1",
      JSON.stringify({ boxes: state.boxes })
    );
  }
};
```

After assembling service functions into an array, wiring them up is simply a matter of calling them
every time the state changes:

```javascript
const services = [storage.service];

states.map(state =>
  services.forEach(service => service({ state, update }))
);
```

You will find the complete example below.

@flems code/services/index-patchinko.js,app.html mithril,mithril-stream,ramda,bss,patchinko 700 60

#### With Function Patches

We can also use this approach with function patches instead of Patchinko. Remember that with
function patches, we produce functions `f(state) => updatedState` instead of object patches, and we
wire up Meiosis like this:

```javascript
const T = (x, f) => f(x);
const update = m.stream();
const states = m.stream.scan(T, initialState(), update);
```

Our acceptors and services have the same structure as before, except that patches are functions
instead of objects. When we call an `acceptor` function, we get back a function. To apply the patch,
we just call the returned function:

```javascript
const acceptors = [stats.accept, description.accept];

const accept = state =>
  acceptors.reduce(
    (updatedState, acceptor) =>
      acceptor(updatedState)(updatedState),
    state
  );
```

As before, we call `accept` in our `scan` accumulator, and also call `accept` on the initial state.
The only difference is that we use `T` instead of `O` to apply a patch -- `T = (x, f) => f(x)`.

```javascript
const states = m.stream.scan(
  (state, patch) => accept(T(state, patch)),
  accept(app.Initial()),
  update
);
```

The rest of the setup is the same as before.

Have a look at the complete example below.

@flems code/services/index-functions.js,app.html mithril,mithril-stream,ramda,bss 700 60

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
